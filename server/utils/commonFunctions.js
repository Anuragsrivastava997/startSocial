import multer from "multer";
import jwt from "jsonwebtoken";
import AppError from "./appError.js";

// creating and sending jwt
const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// common functions to send response
export const sendResponse = (res, status, jsonData, jwt = false) => {
  let token = "";
  if (jwt) {
    token = jwtToken(jsonData.data._id);
  }
  return res.status(status).json({ token, ...jsonData });
};

// filter for multer
const multerFilter = (req, file, cb) => {
  const whitelist = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "video/mp4",
    "video/quicktime",
    "audio/mpeg",
    "audio/mp4",
    "image/gif",
  ];
  if (whitelist.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(401, "Only jpeg, png and jpg files are allowed"));
  }
};

// defining multer storage
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// upload image and profile
export const uploadImage = upload.single("attachments");
export const uploadProfile = upload.single("profilePic");
