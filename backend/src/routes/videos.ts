import { Router } from 'express';
import { getRecommendations } from '../controllers/videoController';
import protect from '../middleware/auth';

const router = Router();

// Protected — user must be logged in to get recommendations
router.post('/recommend', protect, getRecommendations);

export default router;
