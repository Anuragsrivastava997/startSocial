import multer from "multer";
import jwt from "jsonwebtoken";

const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const sendResponse = (res, status, jsonData, jwt = false) => {
  let token = "";
  if (jwt) {
    token = jwtToken(jsonData.data._id);
  }
  return res.status(status).json({ token, ...jsonData });
};

const multerFilter = (req, file, cb) => {
  const whitelist = ["image/png", "image/jpeg", "image/jpg"];
  if (whitelist.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(401, "Only jpeg, png and jpg files are allowed"));
  }
};

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadImage = upload.single("picture");
export const uploadProfile = upload.single("profilePic");
