import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/db-status', async (req, res) => {
  console.log("⚡️ Đã nhận GET /db-status");
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    res.json({
      message: 'Kết nối cơ sở dữ liệu thành công!',
      time: result.rows[0].current_time,
    });
  } catch (err) {
    console.error('Lỗi truy vấn:', err.message);
    res.status(500).json({ message: 'Kết nối cơ sở dữ liệu thất bại.' });
  }
});

export default router;
