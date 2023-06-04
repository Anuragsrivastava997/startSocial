import { body, validationResult } from 'express-validator';

import responseMessage from '../utils/message.js';

const sendResponse = (request, response, next) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
            return response
                  .status(422)
                  .json({ msg: errors.errors.map((element) => element.msg)[0] });
      }

      next();
};

export const validateSignup = [
      body('email')
            .not()
            .isEmpty()
            .withMessage(responseMessage.validationMessage.emptyEmail)
            .isEmail()
            .withMessage(responseMessage.validationMessage.invalidEmail),
      body('contact')
            .trim()
            .not()
            .isEmpty()
            .withMessage(responseMessage.validationMessage.emptyContact)
            .isNumeric()
            .withMessage(responseMessage.validationMessage.invalidContact)
            .isLength({ min: 7, max: 15 })
            .withMessage(responseMessage.validationMessage.invalidContact),
      body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage(responseMessage.validationMessage.emptyPassword)
            .isLength({ min: 8, max: 15 })
            .withMessage(responseMessage.validationMessage.invalidPasswordLength)
            .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%&*?@])[\d!$%&*?@A-Za-z]{8,15}$/,
            )
            .withMessage(responseMessage.validationMessage.invalidPassword),
      (request, response, next) => {
            sendResponse(request, response, next);
      },
];

export const validateLogin = [
      body('email')
            .not()
            .isEmpty()
            .withMessage(responseMessage.validationMessage.emptyEmail)
            .isEmail()
            .withMessage(responseMessage.validationMessage.invalidEmail),
      body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage(responseMessage.validationMessage.emptyPassword)
            .isLength({ min: 8, max: 15 })
            .withMessage(responseMessage.validationMessage.invalidPasswordLength),
      (request, response, next) => {
            sendResponse(request, response, next);
      },
];
