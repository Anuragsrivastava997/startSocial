import mongoose from 'mongoose';
import Event from '../models/eventModels.js';
import Post from '../models/postModels.js';
import User from '../models/userModels.js';
import catchAsync from '../utils/catchAsyncError.js';
import {sendResponse} from '../utils/commonFunctions.js';
import {reduceWithImageMin} from '../utils/imageQualityReducer.js';
import responseMessage from '../utils/message.js';

export const create = catchAsync(async (request, response) => {
  let post = {};
  const {user_id, content, location} = request.body;

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return sendResponse(response, 400, responseMessage.userMessage.invalidId);
  }

  const user = await User.findOne({_id: user_id});
  if (!user) {
    return sendResponse(response, 400, responseMessage.userMessage.notFound);
  }

  post = {
    user_id,
    content,
    location,
    likes: {},
  };

  if (request.file) {
    post.attachments = await reduceWithImageMin(
        request.file.buffer,
        request.file.originalname,
        request.file.mimetype,
    );
  }

  post = await Post.create(post);
  post = await Post.aggregate([
    {
      $match: {isDeleted: false},
    },
    ...aggregationCondition,
  ]);

  return sendResponse(response, 201, {
    msg: responseMessage.postMessage.created,
    data: post,
  });
});

export const getAll = catchAsync(async (request, response) => {
  const posts = await Post.aggregate([aggregationCondition]);
  return sendResponse(response, 200, {data: posts});
});

export const getOne = catchAsync(async (request, response) => {
  let post = {};
  const {id} = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(response, 400, responseMessage.userMessage.invalidId);
  }

  post = await Post.findOne({_id: id, isDeleted: false});

  return sendResponse(response, 200, {post});
});

export const getPostsByUserId = catchAsync(async (request, response) => {
  const {user_id} = request.params;
  let posts = [];

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return sendResponse(response, 500, {
      msg: responseMessage.userMessage.invalidId,
    });
  }

  posts = await Post.find({user_id: user_id, isDeleted: false});
  return sendResponse(response, 200, {data: posts});
});

export const update = catchAsync(async (request, response) => {
  let post = {};
  let postToBeUpdated = {};

  const {id} = request.params;
  const {content, location} = request.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(response, 400, responseMessage.postMessage.invalidId);
  }

  post = await Post.findOne({_id: id});
  if (!post) {
    return sendResponse(response, 404, responseMessage.postMessage.notFound);
  }

  postToBeUpdated = {
    content: content,
    location: location,
  };

  post = await Post.findByIdAndUpdate(id, postToBeUpdated, {new: true});

  return sendResponse(response, 200, {
    msg: responseMessage.postMessage.updated,
    data: post,
  });
});

export const deletePost = catchAsync(async (request, response) => {
  let post = {};
  const {id} = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(response, 400, {
      msg: responseMessage.postMessage.invalidId,
    });
  }

  post = await Post.findOne({_id: id});

  if (!post) {
    return sendResponse(response, 400, {
      msg: responseMessage.postMessage.notFound,
    });
  }

  if (post.isDeleted) {
    return sendResponse(response, 400, {
      msg: responseMessage.postMessage.alreadyDeleted,
    });
  }

  post = await Post.findByIdAndUpdate(id, {isDeleted: true});

  return sendResponse(response, 200, {
    msg: responseMessage.postMessage.deleted,
  });
});

export const addComment = catchAsync(async (request, response) => {
  let post = {};
  const {post_id, user_id, type, post_type, content, parent_post} =
    request.body;

  console.log(post_id, user_id, type, post_type, content);
  if (
    !mongoose.Types.ObjectId.isValid(parent_post) &&
    !mongoose.Types.ObjectId.isValid(user_id)
  ) {
    return sendResponse(response, 400, {
      msg: responseMessage.eventMessage.inValidId,
    });
  }

  post = {
    post_id: parent_post,
    user_id: user_id,
    content: content,
    type: type,
    post_type: post_type,
  };

  console.log(request.body, 'body');
  post = await Event.create(post);
  post = await Post.aggregate([
    {
      $match: {isDeleted: false, _id: mongoose.Types.ObjectId(post_id)},
    },
    ...aggregationCondition,
  ]);

  console.log(post);
  return sendResponse(response, 201, {
    msg: `${type} successfully!`,
    data: post,
  });
});

export const removeComment = catchAsync(async (request, response) => {
  let post = {};
  const {id} = request.params;
  const {user_id, post_id} = request.body;
  let alreadyPost = {};

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(user_id)
  ) {
    return sendResponse(response, 400, {
      msg: responseMessage.eventMessage.inValid,
    });
  }

  alreadyPost = await Event.findOne({_id: id});
  if (!alreadyPost) {
    return sendResponse(res, 400, {
      msg: responseMessage.eventMessage.notFound,
    });
  }

  post = await Event.findOneAndUpdate(
      {_id: id},
      {isDeleted: true},
      {new: true},
  );

  post = await Post.aggregate([
    {
      $match: {isDeleted: false, _id: mongoose.Types.ObjectId(post_id)},
    },
    ...aggregationCondition,
  ]);

  return sendResponse(response, 200, {
    msg: `${alreadyPost.type} deleted successfully!`,
    data: post,
  });
});

export const handleLike = catchAsync(async (request, response) => {
  const {id} = request.params;
  const {user_id} = request.body;
  let post = {};
  let isLiked = false;
  const updatedPost = {};
  let message = '';
  let postToBeSent = {};

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(user_id)
  ) {
    return sendResponse(response, 400, responseMessage.eventMessage.inValidId);
  }

  post = await Post.findById(id);
  isLiked = post.likes.get(user_id);

  if (isLiked) {
    post.likes.delete(user_id);
    message = responseMessage.postMessage.likeRemoved;
  } else {
    post.likes.set(user_id, true);
    message = responseMessage.postMessage.liked;
  }

  await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true});

  postToBeSent = await Post.aggregate([
    {
      $match: {isDeleted: false, _id: mongoose.Types.ObjectId(id)},
    },
    ...aggregationCondition,
  ]);

  return sendResponse(response, 200, {
    msg: message,
    data: postToBeSent,
  });
});

const aggregationCondition = [
  {
    $lookup: {
      from: 'users',
      localField: 'user_id',
      foreignField: '_id',
      as: 'user',
      pipeline: [{$project: {name: 1, location: 1, profilePic: 1, _id: 0}}],
    },
  },
  {
    $lookup: {
      from: 'events',
      localField: '_id',
      foreignField: 'post_id',
      as: 'comment',
      pipeline: [
        {$match: {type: 'comment', isDeleted: false}},
        {
          $lookup: {
            from: 'events',
            localField: '_id',
            foreignField: 'post_id',
            as: 'replies',
            pipeline: [{$match: {type: 'reply', isDeleted: false}}],
          },
        },
      ],
    },
  },
  {
    $unwind: '$user',
  },
];
