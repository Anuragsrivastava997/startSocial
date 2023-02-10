import mongoose from "mongoose";
import Event from "../models/eventModels.js";
import Post from "../models/postModels.js";
import User from "../models/userModels.js";
import catchAsync from "../utils/catchAsyncError.js";
import { sendResponse } from "../utils/commonFunctions.js";
import { reduceWithImageMin } from "../utils/imageQualityReducer.js";
import responseMessage from "../utils/message.js";

// creating the post function
export const create = catchAsync(async (req, res) => {
  let post = {};
  const { user_id, content, location, attachments } = req.body;

  // if invalid user id then return error
  if (!mongoose.Types.ObjectId.isValid(user_id))
    return sendResponse(res, 400, responseMessage.userMessage.invalidId);

  // find user and return if no user is found
  const user = await User.findOne({ _id: user_id });
  if (!user)
    return sendResponse(res, 400, responseMessage.userMessage.notFound);

  post = {
    user_id,
    content,
    location,
    likes: {},
  };

  // if there's attachment then save the file in folder
  if (req.file) {
    post.attachments = await reduceWithImageMin(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );
  }

  // create the post
  post = await Post.create(post);

  // aggregate the posts and send the response
  post = await Post.aggregate([
    {
      $match: { isDeleted: false },
    },
    ...aggregationCondition,
  ]);

  return sendResponse(res, 201, {
    msg: responseMessage.postMessage.created,
    data: post,
  });
});

// function to get all the posts
export const getAll = catchAsync(async (req, res) => {
  let posts = await Post.aggregate([
    {
      $match: { isDeleted: false },
    },
    ...aggregationCondition,
  ]);
  return sendResponse(res, 200, { data: posts });
});

// function to get one post
export const getOne = catchAsync(async (req, res) => {
  let post = {};
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendResponse(res, 400, responseMessage.userMessage.invalidId);

  post = await Post.findOne({ _id: id, isDeleted: false });

  return sendResponse(res, 200, { post });
});

// get posts by user id
export const getPostsByUserId = catchAsync(async (req, res) => {
  const { user_id } = req.params;
  let posts = [];

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return sendResponse(res, 500, {
      msg: responseMessage.userMessage.invalidId,
    });

  posts = await Post.aggregate([
    {
      $match: { user_id: mongoose.Types.ObjectId(user_id), isDeleted: false },
    },
    ...aggregationCondition,
  ]);
  return sendResponse(res, 200, { data: posts });
});

// function to update a post
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

// function to delete a post
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

  post = await Post.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  post = await Post.aggregate([
    {
      $match: { isDeleted: false },
    },
    ...aggregationCondition,
  ]);

  return sendResponse(res, 200, {
    msg: responseMessage.postMessage.deleted,
    data: post,
  });
});

// function to add the comment and reply
export const addComment = catchAsync(async (req, res) => {
  let post = {};
  let postId = "";
  const { post_id, user_id, type, post_type, content, parent_post } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(parent_post) &&
    !mongoose.Types.ObjectId.isValid(user_id)
  ) {
    return sendResponse(res, 400, {
      msg: responseMessage.eventMessage.inValidId,
    });
  }

  postId = parent_post ? parent_post : post_id;

  post = {
    post_id: postId,
    user_id: user_id,
    content: content,
    type: type,
    post_type: post_type,
  };

  post = await Event.create(post);
  post = await Post.aggregate([
    {
      $match: { isDeleted: false, _id: mongoose.Types.ObjectId(post_id) },
    },
    ...aggregationCondition,
  ]);

  return sendResponse(res, 201, { msg: `${type} successfully!`, data: post });
});

// function to remove the comment and reply
export const removeComment = catchAsync(async (req, res) => {
  let post = {};
  const { id } = req.params;
  const { user_id, post_id } = req.body;
  let alreadyPost = {};

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(user_id)
  )
    return sendResponse(res, 400, {
      msg: responseMessage.eventMessage.inValid,
    });

  alreadyPost = await Event.findOne({ _id: id });
  if (!alreadyPost)
    return sendResponse(res, 400, {
      msg: responseMessage.eventMessage.notFound,
    });

  post = await Event.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );

  post = await Post.aggregate([
    {
      $match: { isDeleted: false, _id: mongoose.Types.ObjectId(post_id) },
    },
    ...aggregationCondition,
  ]);

  return sendResponse(res, 200, {
    msg: `${alreadyPost.type} deleted successfully!`,
    data: post,
  });
});

// function to like / dislike a post
export const handleLike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  let post = {};
  let isLiked = false;
  let updatedPost = {};
  let message = "";
  let postToBeSent = {};

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(user_id)
  )
    return sendResponse(res, 400, responseMessage.eventMessage.inValidId);

  post = await Post.findById(id);
  isLiked = post.likes.get(user_id);

  if (isLiked) {
    post.likes.delete(user_id);
    message = responseMessage.postMessage.likeRemoved;
  } else {
    post.likes.set(user_id, true);
    message = responseMessage.postMessage.liked;
  }

  updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true }
  );

  postToBeSent = await Post.aggregate([
    {
      $match: { isDeleted: false, _id: mongoose.Types.ObjectId(id) },
    },
    ...aggregationCondition,
  ]);

  return sendResponse(res, 200, {
    msg: message,
    data: postToBeSent,
  });
});

// common aggregation condition
const aggregationCondition = [
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user",
      pipeline: [{ $project: { name: 1, location: 1, profilePic: 1, _id: 0 } }],
    },
  },
  {
    $lookup: {
      from: "events",
      localField: "_id",
      foreignField: "post_id",
      as: "comment",
      pipeline: [
        { $match: { type: "comment", isDeleted: false } },
        {
          $lookup: {
            from: "events",
            localField: "_id",
            foreignField: "post_id",
            as: "replies",
            pipeline: [{ $match: { type: "reply", isDeleted: false } }],
          },
        },
      ],
    },
  },
  {
    $unwind: "$user",
  },
];
