import glob from "glob";
import sharp, { kernel as _kernel } from "sharp";
import { extname } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const cfg = require("../input/_data/cfg.json");

const { images } = cfg;

// options is optional
glob("src/images/works/*.*(jpg|png)", null, function (err, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // err is an error object or null.
    resizeImages(files, images.fullSize);
    // resizeImages(files, cfg.images.smallSize);
    resizeImages(files, images.thumbSize);
});

function resizeImages(files, dimensions) {
    const width = dimensions.width,
        height = dimensions.height,
        widthString = width === null ? "0" : width.toString(),
        heightString = height === null ? "0" : height.toString(),
        filesCount = files.length,
        counter = 0;

    files.forEach(function (file, index) {
        let extension = extname(file),
            outFile;

        outFile = file
            .replace(extension, "-" + widthString + "x" + heightString + extension)
            .replace('src/', 'assets/');

        sharp(file)
            .resize(width, height, {
                kernel: _kernel.lanczos3
            })
            .crop("northeast")
            .toFile(outFile)
            .then(() => {
                counter++;
                console.log(`${counter}/${filesCount}: ${outFile}`);
                if (counter === filesCount) {
                    console.log(`Resize to ${widthString}x${heightString} completed.`);
                }
            });
    });
}
