import express from 'express';
import { generateHeartfeltReply } from '../services/openai.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: 'No message provided.' });

  try {
    const aiReply = await generateHeartfeltReply(userMessage);
    res.json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

export default router;
