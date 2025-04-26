import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false, // Allows self-signed certificates
  },
});

// Store multiple API keys for fallback
const API_KEYS = [
  process.env.DEEPSEEK_API_KEY,
  process.env.DEEPSEEK_API_KEY1,
  process.env.DEEPSEEK_API_KEY2
];

// Function to fetch AI response with fallback mechanism
async function fetchAIResponse(prompt: string): Promise<string> {
  const referer = process.env.REFERER_URL || 'http://localhost:3000';

  for (const apiKey of API_KEYS) {
    try {
      console.log(`Trying API key: ${apiKey}`);
      const openRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": referer,
          "X-Title": "DriveLearn",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (openRes.ok) {
        const data = await openRes.json();
        console.log('API response:', data);
        return data.choices?.[0]?.message?.content || 'No answer received.';
      } else {
        console.warn(`API key failed (${apiKey}):`, await openRes.text());
      }
    } catch (err) {
      console.error(`Error using API key (${apiKey}):`, err);
    }
  }

  return 'Error: All API keys failed.';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, userId } = req.body;
  if (!question || !question.trim()) return res.status(400).json({ error: 'Question cannot be empty' });
  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  console.log('Fetching user info for userId:', userId);
  try {
    const userResult = await pool.query('SELECT id, board FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = userResult.rows[0];
    const prompt = `You are a tutor for the ${user.board} board. Provide a simple and clear explanation for the following question without using extra formatting like bold (**), hashtags (#), or special characters: ${question}`;
    // 🔥 Fetch AI response using fallback mechanism 🔥
    const answer = await fetchAIResponse(prompt);

    await pool.query(
      'INSERT INTO history (user_id, question, answer) VALUES ($1, $2, $3)',
      [userId, question, answer]
    );

    return res.status(200).json({ answer });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err instanceof Error ? err.message : err });
  }
}
