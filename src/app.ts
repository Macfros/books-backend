import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { registerRoutes } from './routes';

dotenv.config();
const app = express();
app.use(express.json());


registerRoutes(app);

app.get('/', (_req, res) => {
  res.send('Book Review API is running...');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
