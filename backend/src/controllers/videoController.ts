import { Response } from 'express';
import axios from 'axios';
import { AuthRequest } from '../middleware/auth';

// ─── POST /api/videos/recommend ───────────────────────────────
export const getRecommendations = async (req: AuthRequest, res: Response): Promise<void> => {
  const { className, subject, topic } = req.body;

  if (!className || !subject || !topic) {
    res.status(400).json({ error: 'className, subject, and topic are all required.' });
    return;
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const youtubeKey = process.env.YOUTUBE_API_KEY;

  // ── If API keys are not yet configured, return a clear placeholder ──
  if (!geminiKey || geminiKey === 'your_gemini_api_key_here' ||
      !youtubeKey || youtubeKey === 'your_youtube_data_api_v3_key_here') {
    res.status(503).json({
      error: 'AI recommendation engine not yet configured.',
      message: 'GEMINI_API_KEY and YOUTUBE_API_KEY are not set in the backend .env file. Please add your API keys to enable recommendations.',
      keysNeeded: ['GEMINI_API_KEY', 'YOUTUBE_API_KEY'],
    });
    return;
  }

  const badges = ['Top 1', 'Top 2', 'Top 3'];

  try {
    // ── Step 1: Search YouTube for real candidate videos on this topic ──
    const searchResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          maxResults: 8,
          type: 'video',
          q: `${topic} ${subject} ${className}`,
          key: youtubeKey,
        },
      }
    );

    const candidates = (searchResponse.data.items || []).map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`,
    }));

    if (candidates.length === 0) {
      res.status(404).json({ error: 'No YouTube videos found for this topic. Try a different search.' });
      return;
    }

    // ── Step 2: Ask Gemini to pick and rank the best 3 from the real list ──
    const prompt = `A ${className} student is studying ${subject} and wants to learn about: "${topic}".

Here is a list of real YouTube videos (JSON), each with a videoId, title, and description:
${JSON.stringify(candidates)}

Pick the 3 BEST videos from this list for this student, ranked best first. Judge them on:
- Relevance to the topic and ${className} curriculum (40%)
- Clarity and quality of explanation, based on the title/description (30%)
- Depth of content coverage (30%)

You MUST only use videoId values that appear in the list above — do not invent new ones.

Return ONLY a valid JSON array (no markdown, no code blocks) in this exact format:
[
  { "videoId": "one of the given videoIds", "reason": "one short sentence on why this is a great pick" },
  { "videoId": "one of the given videoIds", "reason": "one short sentence" },
  { "videoId": "one of the given videoIds", "reason": "one short sentence" }
]`;

    let ranked: { videoId: string; reason: string }[] = [];

    try {
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
        }
      );

      const rawText = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);

      // Keep only picks that are actually in our real candidate list
      ranked = parsed.filter((p: any) =>
        candidates.some((c: any) => c.videoId === p.videoId)
      );
    } catch (aiErr: any) {
      console.error('Gemini ranking failed, falling back to top search results:', aiErr?.response?.data || aiErr.message);
    }

    // Fallback: if Gemini failed or returned too few valid picks, fill from search order
    if (ranked.length < 3) {
      const usedIds = new Set(ranked.map((r) => r.videoId));
      for (const c of candidates) {
        if (ranked.length >= 3) break;
        if (!usedIds.has(c.videoId)) {
          ranked.push({ videoId: c.videoId, reason: 'A top educational match for this topic.' });
          usedIds.add(c.videoId);
        }
      }
    }

    const videos = ranked.slice(0, 3).map((pick, i) => {
      const source = candidates.find((c: any) => c.videoId === pick.videoId)!;
      return {
        id: source.videoId,
        title: source.title,
        description: pick.reason || source.description,
        thumbnail: source.thumbnail,
        badge: badges[i],
      };
    });

    res.json({ videos });
  } catch (err: any) {
    console.error('Video recommendation error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch recommendations. Please try again.' });
  }
};
