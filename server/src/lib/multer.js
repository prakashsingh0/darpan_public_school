import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define upload directory
const uploadDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage for the files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Allowed file types (extensions + mimetypes)
const allowedExt = /jpeg|jpg|png/;
const allowedMime = /^image\/(jpeg|jpg|png)$/;

// File filter to check allowed extensions and mime types
const fileFilter = (req, file, cb) => {
  const extname = allowedExt.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMime.test(file.mimetype.toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type! Got mimetype: ${file.mimetype}, ext: ${path.extname(
          file.originalname
        )}`
      )
    );
  }
};

// Multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 300 * 1024 * 1024, // 300 MB max
  },
});

// Utility to safely delete local file after upload (avoid storage bloat)
export const removeLocalFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑 Deleted temp file: ${filePath}`);
    }
  } catch (err) {
    console.error('Failed to delete temp file:', err);
  }
};

export default upload;
