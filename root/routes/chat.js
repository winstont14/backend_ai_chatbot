import express from 'express';
import fs from 'fs';
import path from 'path';
import { generateHeartfeltReply } from '../services/openai.js';

const router = express.Router();
const logPath = path.resolve('logs/log.json');

// Simple in-memory history per session (for prototype)
const conversationHistory = [];

router.post('/', async (req, res) => {
  const { message, mood = 'normal' } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided.' });

  try {
    conversationHistory.push({ role: 'user', content: message });
    const aiReply = await generateHeartfeltReply(conversationHistory, mood);
    conversationHistory.push({ role: 'assistant', content: aiReply });

    // Log conversation
    fs.appendFileSync(logPath, JSON.stringify({ time: new Date(), message, reply: aiReply }) + ',\n');

    res.json({ reply: aiReply });
  } catch (err) {
    console.error('❌ GPT API Error:', err.response?.data || err.message || err);
    if (err.code === 'insufficient_quota' || err.status === 429) {
      res.status(429).json({ error: 'ขออภัย ระบบขอพักชั่วคราวเนื่องจากใช้เกินโควตา กรุณาลองใหม่อีกครั้งภายหลัง' });
    } else {
      res.status(500).json({ error: 'Something went wrong.', detail: err.message });
    }
  }
});


export default router;