import { Router } from 'express';
import { register, login, logout, getProfile, updateProfile } from '../controllers/authController';
import protect from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
