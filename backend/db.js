// db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load biến môi trường từ .env
dotenv.config();

// Khởi tạo pool kết nối
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Kiểm tra kết nối ngay khi khởi động
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Không kết nối được tới PostgreSQL:', err.stack);
  } else {
    console.log('✅ Đã kết nối tới PostgreSQL thành công!');
    release(); // Trả lại client cho pool
  }
});

// Export để dùng ở nơi khác (ví dụ trong router hoặc controller)
export default pool;
