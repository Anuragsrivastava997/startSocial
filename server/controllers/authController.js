import catchAsync from "../utils/catchAsyncError.js";
import { sendResponse } from "../utils/commonFunctions.js";
import responseMessage from "../utils/message.js";

export const register = catchAsync(async (req, res) => {
  return sendResponse(res, 200, {
    msg: responseMessage.authMessage.userRegistered,
  });
});
