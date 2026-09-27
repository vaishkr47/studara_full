import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// In-memory fallback store when MongoDB is offline
interface InMemoryUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  school?: string;
  passwordHash: string;
}

const memoryUsers: Map<string, InMemoryUser> = new Map();

// Helper — set the HTTP-only cookie
const setAuthCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

  res.cookie('studara_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// Check if MongoDB is connected
const isMongoConnected = (): boolean => mongoose.connection.readyState === 1;

// ─── POST /api/auth/register ──────────────────────────────────
export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, email, phone, school, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email and password are required.' });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    if (isMongoConnected()) {
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        res.status(409).json({ error: 'An account with this email already exists.' });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email: normalizedEmail, phone, school, passwordHash });

      setAuthCookie(res, user._id.toString());
      res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone, school: user.school },
      });
    } else {
      // In-memory fallback
      if (Array.from(memoryUsers.values()).some((u) => u.email === normalizedEmail)) {
        res.status(409).json({ error: 'An account with this email already exists.' });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const id = 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      const newUser: InMemoryUser = { id, name, email: normalizedEmail, phone, school, passwordHash };
      memoryUsers.set(id, newUser);

      setAuthCookie(res, id);
      res.status(201).json({
        user: { id, name: newUser.name, email: newUser.email, phone: newUser.phone, school: newUser.school },
      });
    }
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

// ─── POST /api/auth/login ─────────────────────────────────────
export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    if (isMongoConnected()) {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      setAuthCookie(res, user._id.toString());
      res.json({
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone, school: user.school },
      });
    } else {
      // In-memory fallback
      const user = Array.from(memoryUsers.values()).find((u) => u.email === normalizedEmail);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      setAuthCookie(res, user.id);
      res.json({
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone, school: user.school },
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
};

// ─── POST /api/auth/logout ────────────────────────────────────
export const logout = (_req: AuthRequest, res: Response): void => {
  res.clearCookie('studara_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.json({ message: 'Logged out successfully.' });
};

// ─── GET /api/auth/profile ────────────────────────────────────
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (isMongoConnected()) {
      const user = await User.findById(req.userId).select('-passwordHash');
      if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }
      res.json({ user });
    } else {
      const user = memoryUsers.get(req.userId || '');
      if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }
      const { passwordHash, ...userClean } = user;
      res.json({ user: userClean });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching profile.' });
  }
};

// ─── PUT /api/auth/profile ────────────────────────────────────
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Name is required.' });
    return;
  }

  try {
    if (isMongoConnected()) {
      const user = await User.findByIdAndUpdate(
        req.userId,
        { name },
        { new: true, select: '-passwordHash' }
      );
      res.json({ user });
    } else {
      const user = memoryUsers.get(req.userId || '');
      if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }
      user.name = name;
      const { passwordHash, ...userClean } = user;
      res.json({ user: userClean });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error updating profile.' });
  }
};
