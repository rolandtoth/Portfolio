import { glob } from "glob";
import sharp from "sharp";
import { extname } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const cfg = require("../input/_data/cfg.json");

const { images } = cfg;
const files = await glob("src/images/works/*.*(jpg|png)", { posix: true, dotRelative: true });

resizeImages(files, images.fullSize);
resizeImages(files, images.thumbSize);

function resizeImages(files, dimensions) {
    const width = dimensions.width,
        height = dimensions.height,
        widthString = width === null ? "0" : width.toString(),
        heightString = height === null ? "0" : height.toString(),
        filesCount = files.length;

    let counter = 0;

    files.forEach(function (file, index) {
        let extension = extname(file),
            outFile;

        outFile = file
            .replace(extension, "-" + widthString + "x" + heightString + extension)
            .replace('src/', 'assets/');

        sharp(file)
            .resize(width, height, { position: "left top" })
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
