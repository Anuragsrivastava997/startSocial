import mongoose from 'mongoose';
import User from '../models/userModels.js';
import catchAsync from '../utils/catchAsyncError.js';
import { sendResponse } from '../utils/commonFunctions.js';
import responseMessage from '../utils/message.js';

export const getUser = catchAsync(async (request, response) => {
      let user = {};
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(response, 400, {
                  msg: responseMessage.userMessage.invalidId,
            });
      }

      user = await User.findById(id);
      user = user._doc;
      delete user.password;

      return sendResponse(response, 200, { data: user });
});

export const getUserFriends = catchAsync(async (request, response) => {
      const { id } = request.params;
      let user = {};

      if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(response, 400, {
                  msg: responseMessage.userMessage.invalidId,
            });
      }

      user = await User.findById(id).populate('friend');

      return sendResponse(response, 200, { data: user.friend });
});

export const addOrRemoveFriend = catchAsync(async (request, response) => {
      const { user_id, friend_id } = request.body;
      let update = {};
      let message = '';

      if (
            !mongoose.Types.ObjectId.isValid(user_id) ||
    !mongoose.Types.ObjectId.isValid(friend_id)
      ) {
            return sendResponse(response, 400, {
                  msg: responseMessage.userMessage.invalidId,
            });
      }

      const alreadyFriend = await User.findOne({ _id: user_id, friend: friend_id });

      if (alreadyFriend) {
            update = { $pull: { friend: friend_id } };
            message = responseMessage.userMessage.friendRemoved;
      } else {
            update = { $addToSet: { friend: friend_id } };
            message = responseMessage.userMessage.friendAdded;
      }

      await User.findByIdAndUpdate(user_id, update, { new: true });

      return sendResponse(response, 200, { msg: message });
});
