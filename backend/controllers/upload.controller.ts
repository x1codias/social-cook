import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';

// Map MIME types to file extensions
const mimeTypes = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = `public/uploads/${
      req.body.username ? 'users' : 'food'
    }`;

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        '_' +
        (req.body.username || req.body.title) +
        mimeTypes[file.mimetype]
    );
  },
});

export const upload = multer({ storage });
