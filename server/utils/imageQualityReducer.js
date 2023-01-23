import imagemin from "imagemin";
import mozJpeg from "imagemin-mozjpeg";
import fs from "fs";

export const reduceWithImageMin = async function (imageBuffer, filename) {
  const uniqueFieName = Date.now() + ".jpeg";
  const filepath = `assets/${uniqueFieName}`;

  const reducedImage = await imagemin.buffer(imageBuffer, {
    plugins: [mozJpeg({ quality: 80 })],
  });

  fs.writeFileSync(filepath, reducedImage);
  return filepath;
};

export const reduceWithImageThumbnail = async function (imageBuffer, filename) {
  const reducedImage = await imagemin.buffer(imageBuffer, {
    plugins: [mozJpeg({ quality: 80 })],
  });
  return reducedImage;
};
