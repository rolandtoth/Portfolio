const cfg = require("../input/data/cfg.json");
const glob = require("glob");
const sharp = require("sharp");
const path = require("path");

// options is optional
glob("src/images/works/*.*(jpg|png)", null, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    resizeImages(files, cfg.images.fullSize);
    // resizeImages(files, cfg.images.smallSize);
    resizeImages(files, cfg.images.thumbSize);
});


function resizeImages(files, dimensions) {

    var width = dimensions.width,
        height = dimensions.height,
        widthString = width === null ? "0" : width.toString(),
        heightString = height === null ? "0" : height.toString(),
        filesCount = files.length,
        counter = 0;

    files.forEach(function (file, index) {

        var extension = path.extname(file),
            outFile;

        outFile = file
            .replace(extension, "-" + widthString + "x" + heightString + extension)
            .replace('src/', 'assets/');

        sharp(file)
            .resize(width, height, {
                kernel: sharp.kernel.lanczos3
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