import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import './config/db.js'; // establishes the DB connection on startup
import authRoutes from './routes/authRoutes.js';
import messRoutes from './routes/messRoutes.js';
import complainRoutes from './routes/messRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/student', authRoutes);
app.use('/student/mess', messRoutes);
//app.use('/student/complain',complainRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});