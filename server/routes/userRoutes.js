import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyToken } from '../middleware/authVerify.js';

const UserRouter = express.Router();

UserRouter.get('/single/:id', verifyToken, userController.getUser);
UserRouter.get('/all/friend/:id', verifyToken, userController.getUserFriends);
UserRouter.post(
      '/action/friend',
      verifyToken,
      userController.addOrRemoveFriend,
);

export default UserRouter;
