import multer from "multer";

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
