import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import pool from './db.js';
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import dbStatusRoute from "./routes/dbStatus.route.js";
import jobRoute from "./routes/jobs.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware 
app.use(express.json()); // Mục đích: Cho phép Express tự động phân tích JSON trong body của request.
app.use(express.urlencoded({extended:true})); // Parse form dữ liệu từ body request
app.use(cookieParser()); // Parse cookie từ header request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

const corsOptions = { 
    origin: 'http://localhost:5173',  
    credentials:true
}
app.use(cors(corsOptions)); 
const PORT = process.env.PORT || 3000;

// api's user
app.use("/api/v1/user", userRoute);
// api's company
app.use("/api/v1/company", companyRoute);
app.use("/api/v1", dbStatusRoute);
app.use("/api/v1/job", jobRoute);

app.listen(PORT, async () => {
  // await createUser();
  console.log(`Server run PORT ${PORT}`)
})

