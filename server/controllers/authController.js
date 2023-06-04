import catchAsync from '../utils/catchAsyncError.js';
import { sendResponse } from '../utils/commonFunctions.js';
import responseMessage from '../utils/message.js';
import bcrypt from 'bcrypt';
import User from '../models/userModels.js';
import { reduceWithImageMin } from '../utils/imageQualityReducer.js';

export const register = catchAsync(async (request, response) => {
      let user = {};
      let hashedPassword = '';
      let alreadyUser = {};
      const {
            name,
            email,
            contact,
            password,
            location,
            occupation,
            relationshipStatus,
      } = request.body;

      if (!name || !email || !contact || !password) {
            return sendResponse(response, 400, {
                  msg: responseMessage.authMessage.invalidDetails,
            });
      }

      alreadyUser = await User.exists({
            $or: [{ email: email }, { contact: contact }],
      });
      if (alreadyUser) {
            return sendResponse(response, 400, {
                  msg: responseMessage.authMessage.emailOrContactAlreadyExists,
            });
      }
      hashedPassword = await bcrypt.hash(password, 10);

      user = {
            name,
            email,
            contact,
            password: hashedPassword,
            location,
            occupation,
            relationshipStatus,
      };

      if (request.file) {
            user.profilePic = await reduceWithImageMin(
                  request.file.buffer,
                  request.file.originalname,
            );
      }

      user = await User.create(user);
      console.log(user, 'user');
      delete user._doc.password;

      return sendResponse(
            response,
            201,
            {
                  msg: responseMessage.userMessage.registered,
                  data: user,
            },
            true,
      );
});

export const login = catchAsync(async (request, response) => {
      let user = {};
      const { email, password } = request.body;

      if (!email || !password) {
            return sendResponse(response, 400, {
                  msg: responseMessage.authMessage.invalidDetails,
            });
      }

      user = await User.findOne({ email }).select('+password');

      if (!user) {
            return sendResponse(response, 400, {
                  msg: responseMessage.userMessage.notFound,
            });
      }

      if (!(await bcrypt.compare(password, user.password))) {
            return sendResponse(response, 400, {
                  msg: responseMessage.authMessage.wrongPassword,
            });
      }

      delete user._doc.password;

      return sendResponse(
            response,
            200,
            { msg: responseMessage.userMessage.loggedIn, data: user },
            true,
      );
});
