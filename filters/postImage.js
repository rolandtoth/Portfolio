export default function (name, dimensions) {
    const width = dimensions.width,
        height = dimensions.height,
        widthString = width === null ? "0" : width.toString(),
        heightString = height === null ? "0" : height.toString();

    name = name.replace('.', `-${widthString}x${heightString}.`);

    return "/assets/images/works/" + name;
};