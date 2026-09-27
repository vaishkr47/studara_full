import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import videoRoutes from './routes/videos';
import watchLaterRoutes from './routes/watchlater';
import youtubeRoutes from './routes/youtube';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1); // Render sits behind a proxy (needed for secure cookies)

// ─── Middleware ───────────────────────────────────────────────
const isLocalhost = (origin: string) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (no origin) and any localhost port in dev,
    // so it keeps working when Vite picks a different port than FRONTEND_URL.
    // RENDER_EXTERNAL_URL is set automatically by Render (the site's own URL).
    if (!origin || origin === process.env.FRONTEND_URL || origin === process.env.RENDER_EXTERNAL_URL || (process.env.NODE_ENV !== 'production' && isLocalhost(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Required for HTTP-only cookies
}));

app.use(express.json());
app.use(cookieParser()); // Parse cookies from incoming requests

// ─── Root & Health Check ──────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (_req, res) => {
    res.json({
      status: 'ok',
      message: 'Welcome to STUDARA Backend API 🚀',
      health: 'http://localhost:5000/api/health',
      frontend: 'http://localhost:5173',
    });
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'STUDARA API is running' });
});

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/watchlater', watchLaterRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/ai', aiRoutes);

// ─── Frontend (production) ────────────────────────────────────
// In production the built React app is served from the same server,
// so the whole site runs on one URL.
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendDist));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// ─── 404 Handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Start Server ─────────────────────────────────────────────
const start = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`✅ STUDARA server running on http://localhost:${PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Stop the other process using it or set a different PORT in .env.`);
    } else {
      console.error('❌ Server error:', err);
    }
    process.exit(1);
  });
};

start().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
