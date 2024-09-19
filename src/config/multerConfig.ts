import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { ErrorCode } from '../utils/errorCodes';
import { AppError } from '../utils/error';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (_req: Request, file: Express.Multer.File, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedTypes = ['application/pdf', 'application/msword'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        ErrorCode.API_VALIDATION_ERROR,
        'Invalid file type. Only PDFs or Word documents are allowed.',
      ),
      false,
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export default upload;
