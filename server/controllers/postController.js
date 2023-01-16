import mongoose from "mongoose";
import Event from "../models/eventModels.js";
import Post from "../models/postModels.js";
import User from "../models/userModels.js";
import catchAsync from "../utils/catchAsyncError.js";
import { sendResponse } from "../utils/commonFunctions.js";
import responseMessage from "../utils/message.js";

export const create = catchAsync(async (req, res) => {
  let post = {};
  const { user_id, content, location, attachments } = req.body;

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return sendResponse(res, 400, responseMessage.userMessage.invalidId);

  const user = await User.findOne({ _id: user_id });
  if (!user)
    return sendResponse(res, 400, responseMessage.userMessage.notFound);

  post = {
    user_id: user_id,
    content: content,
    location: location,
  };

  post = await Post.create(post);

  return sendResponse(res, 201, {
    msg: responseMessage.postMessage.created,
    data: post,
  });
});

export const getAll = catchAsync(async (req, res) => {
  let posts = await Post.find({ isDeleted: false });
  return sendResponse(res, 200, { data: posts });
});

export const getOne = catchAsync(async (req, res) => {
  let post = {};
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendResponse(res, 400, responseMessage.userMessage.invalidId);

  post = await Post.findOne({ _id: id, isDeleted: false });

  return sendResponse(res, 200, { post });
});

export const update = catchAsync(async (req, res) => {
  let post = {};
  let postToBeUpdated = {};

  const { id } = req.params;
  const { content, location } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendResponse(res, 400, responseMessage.postMessage.invalidId);

  post = await Post.findOne({ _id: id });
  if (!post)
    return sendResponse(res, 404, responseMessage.postMessage.notFound);

  postToBeUpdated = {
    content: content,
    location: location,
  };

  post = await Post.findByIdAndUpdate(id, postToBeUpdated, { new: true });

  return sendResponse(res, 200, {
    msg: responseMessage.postMessage.updated,
    data: post,
  });
});

export const deletePost = catchAsync(async (req, res) => {
  let post = {};
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendResponse(res, 400, {
      msg: responseMessage.postMessage.invalidId,
    });

  post = await Post.findOne({ _id: id });

  if (!post)
    return sendResponse(res, 400, {
      msg: responseMessage.postMessage.notFound,
    });

  if (post.isDeleted)
    return sendResponse(res, 400, {
      msg: responseMessage.postMessage.alreadyDeleted,
    });

  post = await Post.findByIdAndUpdate(id, { isDeleted: true });

  return sendResponse(res, 200, {
    msg: responseMessage.postMessage.deleted,
  });
});

export const addAction = catchAsync(async (req, res) => {
  let post = {};
  const { post_id, user_id, type, post_type } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(post_id) ||
    !mongoose.Types.ObjectId.isValid(user_id)
  )
    return sendResponse(res, 400, {
      msg: responseMessage.eventMessage.inValidId,
    });

  post = {
    post_id: post_id,
    user_id: user_id,
    type: type,
    post_type: post_type,
  };

  post = await Event.create(post);
  return sendResponse(res, 201, { msg: `${type} successfully!` });
});

export const removeAction = catchAsync(async (req, res) => {
  let post = {};
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendResponse(res, 400, {
      msg: responseMessage.eventMessage.inValid,
    });

  post = await Event.findOne({ _id: id });
  if (!post)
    return sendResponse(res, 400, {
      msg: responseMessage.eventMessage.notFound,
    });

  post = await Event.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );

  return sendResponse(res, 200, {
    msg: responseMessage.eventMessage.deleted,
  });
});
