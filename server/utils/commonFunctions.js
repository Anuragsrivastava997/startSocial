import multer from "multer";
import jwt from "jsonwebtoken";

const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const sendResponse = (res, status, body, jwt = false) => {
  let token = "";
  if (jwt) {
    token = jwtToken(body.id);
  }
  return res.status(status).json({ token, ...body });
};

const uniqueTime = Date.now();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqueTime}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
