import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    location: { type: String },
    attachments: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
