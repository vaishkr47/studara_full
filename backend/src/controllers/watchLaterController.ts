import { Response } from 'express';
import mongoose from 'mongoose';
import WatchLater from '../models/WatchLater';
import { AuthRequest } from '../middleware/auth';

interface InMemoryWatchLater {
  id: string;
  userId: string;
  videoId: string;
  title: string;
  thumbnail: string;
  badge: 'Top 1' | 'Top 2' | 'Top 3';
  savedAt: Date;
}

const memoryWatchLater: InMemoryWatchLater[] = [];

const isMongoConnected = (): boolean => mongoose.connection.readyState === 1;

// ─── GET /api/watchlater ──────────────────────────────────────
export const getWatchLater = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (isMongoConnected()) {
      const items = await WatchLater.find({ userId: req.userId }).sort({ savedAt: -1 });
      res.json({ videos: items });
    } else {
      const items = memoryWatchLater.filter((i) => i.userId === req.userId);
      res.json({ videos: items });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Watch Later list.' });
  }
};

// ─── POST /api/watchlater ─────────────────────────────────────
export const addToWatchLater = async (req: AuthRequest, res: Response): Promise<void> => {
  const { videoId, title, thumbnail, badge } = req.body;

  if (!videoId || !title || !badge) {
    res.status(400).json({ error: 'videoId, title and badge are required.' });
    return;
  }

  try {
    if (isMongoConnected()) {
      const item = await WatchLater.create({
        userId: req.userId,
        videoId,
        title,
        thumbnail: thumbnail || '',
        badge,
      });
      res.status(201).json({ video: item, message: 'Saved to Watch Later!' });
    } else {
      const exists = memoryWatchLater.some((i) => i.userId === req.userId && i.videoId === videoId);
      if (exists) {
        res.status(409).json({ error: 'This video is already in your Watch Later list.' });
        return;
      }

      const item: InMemoryWatchLater = {
        id: 'wl_' + Date.now(),
        userId: req.userId || 'guest',
        videoId,
        title,
        thumbnail: thumbnail || '',
        badge,
        savedAt: new Date(),
      };
      memoryWatchLater.push(item);
      res.status(201).json({ video: item, message: 'Saved to Watch Later!' });
    }
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'This video is already in your Watch Later list.' });
      return;
    }
    console.error('Watch Later save error:', err);
    res.status(500).json({ error: 'Failed to save video.' });
  }
};

// ─── DELETE /api/watchlater/:videoId ─────────────────────────
export const removeFromWatchLater = async (req: AuthRequest, res: Response): Promise<void> => {
  const { videoId } = req.params;

  try {
    if (isMongoConnected()) {
      const result = await WatchLater.deleteOne({ userId: req.userId, videoId });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Video not found in Watch Later.' });
        return;
      }
      res.json({ message: 'Removed from Watch Later.' });
    } else {
      const index = memoryWatchLater.findIndex((i) => i.userId === req.userId && i.videoId === videoId);
      if (index === -1) {
        res.status(404).json({ error: 'Video not found in Watch Later.' });
        return;
      }
      memoryWatchLater.splice(index, 1);
      res.json({ message: 'Removed from Watch Later.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove video.' });
  }
};
