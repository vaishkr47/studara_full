import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// GET /api/youtube/search?q=query
router.get('/search', async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ error: 'Query parameter "q" is required.' });
    return;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey === 'your_youtube_data_api_v3_key_here') {
    res.status(500).json({
      error: 'YouTube API key is missing or not configured on the server.',
    });
    return;
  }

  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          maxResults: 10,
          type: 'video',
          q: query,
          key: apiKey,
        },
      }
    );

    const items = response.data.items || [];
    const videos = items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url ||
        `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`,
    }));

    res.json({ success: true, videos });
  } catch (error: any) {
    console.error('YouTube API Proxy Error:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch search results from YouTube API.',
      details: error?.response?.data?.error?.message || error.message,
    });
  }
});

export default router;
