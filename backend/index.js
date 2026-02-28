import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import dbStatusRoute from "./routes/dbStatus.route.js";
import jobRoute from "./routes/jobs.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ========================
   ✅ CORS CONFIG (QUAN TRỌNG)
======================== */

const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "http://localhost:3000", // React dev (nếu có)
  "http://localhost:8000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // cho phép request từ Postman hoặc server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Handle preflight request
app.options("*", cors({
  origin:true,
  credentials:true
}));

/* ========================
   ✅ MIDDLEWARE
======================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Log request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
}); 

/* ========================
   ✅ STATIC FILE
======================== */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ========================
   ✅ ROUTES
======================== */

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1", dbStatusRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

/* ========================
   ✅ ERROR HANDLER
======================== */

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ========================
   ✅ START SERVER
======================== */

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});