import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middleware/authVerify.js";

const UserRouter = express.Router();

UserRouter.get("/single/:id", verifyToken, userController.getUser);

export default UserRouter;
