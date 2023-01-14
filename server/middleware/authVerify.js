import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/commonFunctions";
import responseMessage from "../utils/message";

export const verifyToken = (req, res, next) => {
  let token = req.headers("Authorization");

  if (!token)
    return sendResponse(res, 403, {
      msg: responseMessage.authMessage.unAuthorised,
    });

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!verifyToken)
    return sendResponse(res, 403, {
      msg: responseMessage.authMessage.invalidToken,
    });

  req.user = verifyToken;
  next();
};
