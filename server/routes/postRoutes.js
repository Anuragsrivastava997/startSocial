import express from "express";
import * as postController from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post("/create", postController.create);
postRouter.get("/all", postController.getAll);
postRouter.get("/:id", postController.getOne);
postRouter.patch("/:id", postController.update);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;
