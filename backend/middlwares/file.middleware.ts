import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';

// Map MIME types to file extensions
export const mimeTypes = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'video/mp4': '.mp4',
  'video/x-msvideo': '.avi',
  'video/quicktime': '.mov',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = `public/uploads/temp`;

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir); // Store in temp initially
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + '-' + file.originalname // Unique temporary filename
    );
  },
});

export const upload = multer({ storage });
