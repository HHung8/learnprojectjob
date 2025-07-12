import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import pool from './db.js'

const app = express();

// middleware 
app.use(express.json()); // Mục đích: Cho phép Express tự động phân tích JSON trong body của request.
app.use(express.urlencoded({extended:true})); // Parse form dữ liệu từ body request
app.use(cookieParser()); // Parse cookie từ header request

const createUser = async () => {
  try {
    const res = await pool.query(
      'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *',
      ['Nguyen Van A', 'nguyenvana@example.com']
    );
    console.log('🟢 Thêm user thành công:', res.rows[0]);
  } catch (err) {
    console.error('❌ Lỗi khi thêm user:', err.message);
  }
};
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));
const PORT = 3000;

app.listen(PORT, async () => {
  await createUser();
})

