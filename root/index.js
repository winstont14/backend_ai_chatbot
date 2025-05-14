import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import chatRoute from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/chat', chatRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});