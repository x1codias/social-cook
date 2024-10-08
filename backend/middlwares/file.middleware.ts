import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';

// Map MIME types to file extensions
export const mimeTypes = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subFoodFolder =
      file.fieldname === 'images' ? '/' : '/preparation';

    const uploadDir = `public/uploads/${
      req.body.username
        ? 'users'
        : 'food/' + req.body.userId + subFoodFolder
    }`;

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      (req.body.username || req.body.title) +
        '_' +
        req.files.length +
        mimeTypes[file.mimetype]
    );
  },
});

export const upload = multer({ storage });
