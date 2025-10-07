// import multer from "multer";
// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file")

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// __dirname cho ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình diskStorage
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, "uploads/");
    },
    filename: function(req,file,cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()*1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const singleUpload = multer({storage}).single("file")