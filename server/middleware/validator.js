import { body, validationResult, check } from "express-validator";

import { sendResponse } from "../utils/commonFunctions";
import AppError from "../utils/appError";
import responseMessage from "../utils/message";

const sendResponse = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.errors.map((el) => el.msg)[0] });
  }

  next();
};

exports.validateSignup = [
  body("email")
    .not()
    .isEmpty()
    .withMessage(responseMessage.validationMessage.emptyEmail)
    .isEmail()
    .withMessage(responseMessage.validationMessage.invalidEmail),
  body("contact")
    .trim()
    .not()
    .isEmpty()
    .withMessage(responseMessage.validationMessage.emptyContact)
    .isNumeric()
    .withMessage(responseMessage.validationMessage.invalidContact)
    .isLength({ min: 7, max: 15 })
    .withMessage(responseMessage.validationMessage.invalidContact),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage(responseMessage.validationMessage.emptyPassword)
    .isLength({ min: 8, max: 15 })
    .withMessage(responseMessage.validationMessage.invalidPassword)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    )
    .withMessage(responseMessage.validationMessage.invalidPassword),
  (req, res, next) => {
    sendResponse(req, res, next);
  },
];

exports.validateLogin = [
  body("email")
    .not()
    .isEmpty()
    .withMessage(responseMessage.validationMessage.emptyEmail)
    .isEmail()
    .withMessage(responseMessage.validationMessage.invalidEmail),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage(responseMessage.validationMessage.emptyPassword)
    .isLength({ min: 8, max: 15 })
    .withMessage(responseMessage.validationMessage.invalidPassword)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    )
    .withMessage(responseMessage.validationMessage.invalidPassword),
  (req, res, next) => {
    sendResponse(req, res, next);
  },
];
