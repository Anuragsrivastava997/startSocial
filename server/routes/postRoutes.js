import express from "express";
import * as postController from "../controllers/postController.js";
import { verifyToken } from "../middleware/authVerify.js";
import { uploadImage } from "../utils/commonFunctions.js";

const postRouter = express.Router();

postRouter.post("/create", uploadImage, verifyToken, postController.create);
postRouter.get("/all", verifyToken, postController.getAll);
postRouter.get("/user/:user_id", verifyToken, postController.getPostsByUserId);
postRouter.get("/single/:id", verifyToken, postController.getOne);
postRouter.patch("/update/:id", verifyToken, postController.update);
postRouter.delete("/delete/:id", verifyToken, postController.deletePost);

// post events
postRouter.post("/comment/add", verifyToken, postController.addComment);
postRouter.post(
  "/comment/remove/:id",
  verifyToken,
  postController.removeComment
);
postRouter.patch("/like/:id", verifyToken, postController.handleLike);

export default postRouter;
