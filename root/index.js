import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRoute from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/chat', chatRoute);
app.use(express.static(path.join(__dirname, 'public'))); // serve UI

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});