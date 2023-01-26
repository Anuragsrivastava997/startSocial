import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    location: { type: String },
    attachments: { type: String },
    isDeleted: { type: Boolean, default: false },
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
