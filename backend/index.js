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
console.log('毎日ITを勉強してるでもがんばってくださいね')
console.log('Test commit 2')
console.log('Test commit 3')
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

