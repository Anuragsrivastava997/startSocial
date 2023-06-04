import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/commonFunctions.js';
import responseMessage from '../utils/message.js';

export const verifyToken = (request, response, next) => {
      let token = request.headers['authorization'];

      if (!token) {
            return sendResponse(response, 403, {
                  msg: responseMessage.authMessage.unAuthorised,
            });
      }

      if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
      }

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!verifyToken) {
            return sendResponse(response, 403, {
                  msg: responseMessage.authMessage.invalidToken,
            });
      }

      request.user = verifyToken;
      next();
};
