import multer from 'multer';
import jwt from 'jsonwebtoken';
import AppError from './appError.js';

const jwtToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
      });
};

export const sendResponse = (response, status, jsonData, jwt = false) => {
      let token = '';
      if (jwt) {
            token = jwtToken(jsonData.data._id);
      }
      return response.status(status).json({ token, ...jsonData });
};

const multerFilter = (request, file, callback) => {
      const whitelist = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'video/mp4',
            'video/quicktime',
            'audio/mpeg',
            'audio/mp4',
            'image/gif',
      ];
      if (whitelist.includes(file.mimetype)) {
            callback(undefined, true);
      } else {
            callback(new AppError(401, 'Only jpeg, png and jpg files are allowed'));
      }
};

const multerStorage = multer.memoryStorage();

const upload = multer({
      storage: multerStorage,
      fileFilter: multerFilter,
});

export const uploadImage = upload.single('attachments');
export const uploadProfile = upload.single('profilePic');
