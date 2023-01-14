import express from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/authVerify.js";
import * as validation from "../middleware/validator.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validation.validateSignup,
  authController.register
);

authRouter.post("/login", validation.validateLogin, authController.login);
authRouter.post("/verify", verifyToken, authController.verify);

export default authRouter;
