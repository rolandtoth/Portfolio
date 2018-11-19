const sizeOf = require("image-size");

/*
Return width and height for images.
*/
module.exports = function (path) {
  if (path.charAt(0) === '/') {
    path = path.substr(1);
  }
  let dimensions = sizeOf(path);

  return dimensions ? `width="${dimensions.width}" height="${dimensions.height}"` : "";
};