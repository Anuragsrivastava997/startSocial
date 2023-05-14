import imagemin from 'imagemin';
import mozJpeg from 'imagemin-mozjpeg';
import fs from 'node:fs';

export const reduceWithImageMin = async function(
    imageBuffer,
    filename,
    mimetype,
) {
  const extension = filename.split('.').pop();
  const uniqueFieName = Date.now() + '.' + extension;
  let filepath = `public/assets/${uniqueFieName}`;

  const imageType = ['image/png', 'image/jpeg', 'image/jpg'];

  let updatedImageBuffer = imageBuffer;

  if (imageType.includes(mimetype)) {
    updatedImageBuffer = await imagemin.buffer(imageBuffer, {
      plugins: [mozJpeg({quality: 80})],
    });
  }

  fs.writeFileSync(filepath, updatedImageBuffer);
  filepath = `assets/${uniqueFieName}`;
  return filepath;
};
