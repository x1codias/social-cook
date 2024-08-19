import { existsSync, mkdirSync, readdir } from 'fs';
import multer from 'multer';
import path from 'path';
import { errorHandler, Errors } from './error.controller';
import { Request, Response } from 'express';

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
