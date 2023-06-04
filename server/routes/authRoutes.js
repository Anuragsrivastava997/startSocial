import express from 'express';
import * as authController from '../controllers/authController.js';
import * as validation from '../middleware/validator.js';
import { uploadProfile } from '../utils/commonFunctions.js';

const authRouter = express.Router();

authRouter.post(
      '/register',
      uploadProfile,
      validation.validateSignup,
      authController.register,
);

authRouter.post('/login', validation.validateLogin, authController.login);

export default authRouter;
