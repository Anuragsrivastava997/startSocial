import mongoose from "mongoose";
import User from "../models/userModels.js";
import catchAsync from "../utils/catchAsyncError.js";
import { sendResponse } from "../utils/commonFunctions.js";
import responseMessage from "../utils/message.js";

export const getUser = catchAsync(async (req, res) => {
  let user = {};
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendResponse(res, 400, {
      msg: responseMessage.userMessage.invalidId,
    });

  user = await User.findById(id).populate(
    "friend",
    "_id name email  profilePic"
  );

  delete user.password;

  return sendResponse(res, 200, { data: user });
});

export const getUserFriends = catchAsync(async (req, res) => {
  const { id } = req.params;
  let user = {};

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendResponse(res, 400, {
      msg: responseMessage.userMessage.invalidId,
    });

  user = await User.findById(id).populate(
    "friend",
    "_id name email profilePic"
  );

  return sendResponse(res, 200, { data: user });
});

export const addOrRemoveFriend = catchAsync(async (req, res) => {
  const { user_id, friend_id } = req.body;
  let update = {};
  let message = "";
  let user = {};

  if (
    !mongoose.Types.ObjectId.isValid(user_id) ||
    !mongoose.Types.ObjectId.isValid(friend_id)
  )
    return sendResponse(res, 400, {
      msg: responseMessage.userMessage.invalidId,
    });

  const alreadyFriend = await User.findOne({ _id: user_id, friend: friend_id });

  if (alreadyFriend) {
    update = { $pull: { friend: friend_id } };
    message = responseMessage.userMessage.friendRemoved;
  } else {
    update = { $addToSet: { friend: friend_id } };
    message = responseMessage.userMessage.friendAdded;
  }

  user = await User.findByIdAndUpdate(user_id, update, { new: true }).populate(
    "friend",
    "_id name email profilePic"
  );

  console.log(user, "user");

  return sendResponse(res, 200, { msg: message, data: user });
});
