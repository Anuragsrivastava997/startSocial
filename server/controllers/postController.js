import mongoose from "mongoose";
import Event from "../models/eventModels";
import Post from "../models/postModels";
import User from "../models/userModels";
import catchAsync from "../utils/catchAsyncError";
import { sendResponse } from "../utils/commonFunctions";
import responseMessage from "../utils/message";

export const create = catchAsync(async (req, res) => {
  try {
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
    return sendResponse(res, 201, { msg: responseMessage.postMessage.created });
  } catch (error) {
    return sendResponse(res, 500, {
      msg: responseMessage.other.interServerErr,
    });
  }
});

export const getAll = catchAsync(async (req, res) => {
  try {
    let posts = await Post.find({ isDeleted: true });
    return sendResponse(res, 200, { posts });
  } catch (err) {
    return sendResponse(res, 500, {
      msg: responseMessage.other.interServerErr,
    });
  }
});

export const getOne = catchAsync(async (req, res) => {
  try {
    let post = {};
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return sendResponse(res, 400, responseMessage.userMessage.invalidId);

    post = await Post.findOne({ _id: id, isDeleted: false });

    return sendResponse(res, 200, { post });
  } catch (error) {
    return sendResponse(res, 500, {
      msg: responseMessage.other.interServerErr,
    });
  }
});

export const update = catchAsync(async (req, res) => {
  try {
    let post = {};
    const { id, content, location } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return sendResponse(res, 400, responseMessage.postMessage.invalidId);

    post = await Post.findOne({ _id: id, isDeleted: false });
    if (!post)
      return sendResponse(res, 404, responseMessage.postMessage.notFound);

    post = {
      content,
      location,
    };
    post = await Post.findOneAndUpdate({ _id: id }, { post }, { new: true });

    return sendResponse(res, 200, {
      msg: responseMessage.postMessage.updated,
      data: post,
    });
  } catch (error) {
    return sendResponse(res, 500, responseMessage.other.interServerErr);
  }
});

export const deletePost = catchAsync(async (req, res) => {
  try {
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

    post = await Post.findOneAndUpdate({ _id: id }, { isDeleted: true });

    return sendResponse(res, 200, {
      msg: responseMessage.postMessage.deleted,
    });
  } catch (error) {
    return sendResponse(res, 500, responseMessage.other.interServerErr);
  }
});

export const addAction = catchAsync(async (req, res) => {
  try {
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

    post = await Post.create(post);
    return sendResponse(res, 201, { msg: `${type} successfully!` });
  } catch (error) {
    return sendResponse(res, 500, {
      msg: responseMessage.other.interServerErr,
    });
  }
});

export const removeAction = catchAsync(async (req, res) => {
  try {
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
  } catch (error) {
    return sendResponse(res, 500, {
      msg: responseMessage.other.interServerErr,
    });
  }
});
