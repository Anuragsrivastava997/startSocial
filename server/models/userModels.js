import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePic: {
      type: String,
      default: "",
    },
    friend: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    relationshipStatus: {
      type: String,
      default: "Single",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
