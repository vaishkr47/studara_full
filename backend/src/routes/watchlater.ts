import { Router } from 'express';
import { getWatchLater, addToWatchLater, removeFromWatchLater } from '../controllers/watchLaterController';
import protect from '../middleware/auth';

const router = Router();

// All watchlater routes require authentication
router.get('/', protect, getWatchLater);
router.post('/', protect, addToWatchLater);
router.delete('/:videoId', protect, removeFromWatchLater);

export default router;
