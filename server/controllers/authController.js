import catchAsync from "../utils/catchAsyncError.js";
import { sendResponse } from "../utils/commonFunctions.js";
import responseMessage from "../utils/message.js";
import bcrypt from "bcrypt";
import User from "../models/userModels.js";

export const register = catchAsync(async (req, res) => {
  let user = {};
  let hashedPassword = "";
  const { name, email, contact, password } = req.body;

  if (!name || !email || !contact || !password)
    return sendResponse(res, 400, {
      msg: responseMessage.authMessage.invalidDetails,
    });

  hashedPassword = await bcrypt.hash(password, 10);

  user = {
    name,
    email,
    contact,
    password: hashedPassword,
  };

  user = await User.create(user);
  console.log(user, "user");
  delete user._doc.password;

  return sendResponse(
    res,
    201,
    {
      msg: responseMessage.userMessage.registered,
      data: user,
    },
    true
  );
});

export const login = catchAsync(async (req, res) => {
  let user = {};
  const { email, password } = req.body;

  if (!email || !password)
    return sendResponse(res, 400, {
      msg: responseMessage.authMessage.invalidDetails,
    });

  user = await User.findOne({ email }).select("+password");

  if (!user)
    return sendResponse(res, 400, {
      msg: responseMessage.userMessage.notFound,
    });

  if (!(await bcrypt.compare(password, user.password)))
    return sendResponse(res, 400, {
      msg: responseMessage.authMessage.wrongPassword,
    });

  delete user._doc.password;

  return sendResponse(
    res,
    200,
    { msg: responseMessage.userMessage.loggedIn, data: user },
    true
  );
});

export const verify = catchAsync(async (req, res) => {
  return sendResponse(res, 200, { msg: responseMessage.userMessage.loggedIn });
});
