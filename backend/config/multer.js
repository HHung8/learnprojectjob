import multer from "multer";
import fs from "fs";
import path from "path";

// Thư mục lưu file upload
const UPLOAD_FOLDER = path.join(process.cwd(), "uploads");

// Tạo folder nếu chưa tồn tại
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

// Cấu hình storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

// Filter file nếu muốn (ví dụ chỉ cho phép hình ảnh)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép file ảnh (jpg, jpeg, png)"));
  }
};

// Export multer middleware
const upload = multer({ storage, fileFilter });

export default upload;
