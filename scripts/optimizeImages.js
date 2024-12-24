import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

(async () => {
    const files = await imagemin(["assets/images/works/*.{jpg,png}"], "assets/images/works", {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: "65-80"
            })
        ]
    });

    console.log("Image optimization complete.");
    // console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: "build/images/foo.jpg"}, …]
})();