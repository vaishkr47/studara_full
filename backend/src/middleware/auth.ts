import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request to carry userId
export interface AuthRequest extends Request {
  userId?: string;
}

const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Read token from HTTP-only cookie (not localStorage)
  const token = req.cookies?.studara_token;

  if (!token) {
    res.status(401).json({ error: 'Not authenticated. Please login.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Session expired. Please login again.' });
  }
};

export default protect;
