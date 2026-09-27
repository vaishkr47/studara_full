import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// POST /api/ai/recommend
router.post('/recommend', async (req: Request, res: Response): Promise<void> => {
  const { prompt, query, topic, className, subject } = req.body;

  // Build the user prompt from available fields
  let userPrompt = prompt || query;
  if (!userPrompt && topic) {
    userPrompt = `Provide a concise study recommendation and key concepts overview for a ${
      className || 'student'
    } studying ${subject || 'general topics'} on the topic: "${topic}".`;
  }

  if (!userPrompt) {
    res.status(400).json({
      error: 'Request body must contain a "prompt", "query", or "topic".',
    });
    return;
  }

  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

  if (
    !apiKey ||
    apiKey === 'your_gemini_api_key_here' ||
    apiKey === 'your_ai_api_key_here'
  ) {
    res.status(500).json({
      error: 'AI API key (AI_API_KEY or GEMINI_API_KEY) is missing or not configured on the server.',
    });
    return;
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }
    );

    const recommendation =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No recommendation generated.';

    res.json({
      success: true,
      recommendation,
    });
  } catch (error: any) {
    console.error('AI Proxy Error:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to generate AI recommendation.',
      details: error?.response?.data?.error?.message || error.message,
    });
  }
});

export default router;
