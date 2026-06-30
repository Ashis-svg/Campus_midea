import mysql from 'mysql2';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.SQLP,
  database: process.env.DB_NAME || 'student_media',
});

db.connect((err) => {
  if (err) {
    console.log('Database connection failed!', err);
    return;
  }
  console.log('Database connected successfully!');
});

// Promisified query, so controllers can use async/await instead of
// nested callbacks. Usage: const rows = await query(sql, params);
export const query = promisify(db.query).bind(db);

export default db;