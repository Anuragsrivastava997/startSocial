import catchAsync from "../utils/catchAsyncError.js";
import { sendResponse } from "../utils/commonFunctions.js";
import responseMessage from "../utils/message.js";
import bcrypt from "bcrypt";
import User from "../models/userModels.js";
import { reduceWithImageMin } from "../utils/imageQualityReducer.js";

// user registration function
export const register = catchAsync(async (req, res) => {
  let user = {};
  let hashedPassword = "";
  let alreadyUser = {};
  const {
    name,
    email,
    contact,
    password,
    location,
    occupation,
    relationshipStatus,
    profilePic,
  } = req.body;

  // return if any of the required fields are
  if (!name || !email || !contact || !password)
    return sendResponse(res, 400, {
      msg: responseMessage.authMessage.invalidDetails,
    });

  // checking if already user is created then return with error
  alreadyUser = await User.exists({
    $or: [{ email: email }, { contact: contact }],
  });

  if (alreadyUser)
    return sendResponse(res, 400, {
      msg: responseMessage.authMessage.emailOrContactAlreadyExists,
    });

  // hashing the password
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

  // if image then minify and save in the folder
  if (req.file) {
    user.profilePic = await reduceWithImageMin(
      req.file.buffer,
      req.file.originalname
    );
  }

  // create a new profile and token
  user = await User.create(user);
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

// user login function
export const login = catchAsync(async (req, res) => {
  let user = {};
  const { email, password } = req.body;

  // if any of the required fields are not provided then return with error
  if (!email || !password)
    return sendResponse(res, 400, {
      msg: responseMessage.authMessage.invalidDetails,
    });

  // find user by email
  user = await User.findOne({ email })
    .populate("friend", "_id name email")
    .select("+password");

  // if no user is found return with error
  if (!user)
    return sendResponse(res, 400, {
      msg: responseMessage.userMessage.notFound,
    });

  // compare password with user's password if not retun with error
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
