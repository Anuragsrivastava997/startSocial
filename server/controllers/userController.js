import mongoose from "mongoose";
import User from "../models/userModels";
import catchAsync from "../utils/catchAsyncError";
import { sendResponse } from "../utils/commonFunctions";
import responseMessage from "../utils/message";

export const getUser = catchAsync(async (req, res) => {
  let user = {};
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendResponse(res, 400, {
      msg: responseMessage.userMessage.invalidId,
    });

  user = await User.findById(id);
  delete user._doc.password;

  return sendResponse(res, 200, user);
});
