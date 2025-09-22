import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Không kết nối được tới PostgreSQL:', err.stack);
  } else {
    console.log('✅ Đã kết nối tới PostgreSQL thành công!');
    release();
  }
});

export default pool;
