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

  user = await User.findById(id);
  user = user._doc;
  delete user.password;

  return sendResponse(res, 200, { data: user });
});
