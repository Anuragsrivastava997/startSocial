import express from "express";
import * as postController from "../controllers/postController.js";
import { verifyToken } from "../middleware/authVerify.js";

const postRouter = express.Router();

postRouter.post("/create", verifyToken, postController.create);
postRouter.get("/all", verifyToken, postController.getAll);
postRouter.get("/:id", verifyToken, postController.getOne);
postRouter.patch("/:id", verifyToken, postController.update);
postRouter.delete("/:id", verifyToken, postController.deletePost);

// post events
postRouter.post("/action/add", verifyToken, postController.addAction);
postRouter.post("/action/remove", verifyToken, postController.removeAction);

export default postRouter;
