const htmlmin = require("html-minifier");
const glob = require("glob");
const cfg = require("./input/data/cfg.json");
const path = require('path');

module.exports = function (eleventyConfig) {

  glob.sync("./filters/*.js").forEach(filePath => {
    let pathInfo = path.parse(filePath);
    eleventyConfig.addFilter(pathInfo.base.replace(pathInfo.ext, ""), require(filePath));
  });

  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addPassthroughCopy(".htaccess");

  eleventyConfig.addCollection("work", function (collection) {
    return collection.getFilteredByTag("work").reverse();
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "input",
      data: "data",
      output: "dist",
      includes: "includes"
    },
    pathPrefix: cfg.pathPrefix,
    templateFormats: ["njk", "md", "json"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: false,
    passthroughFileCopy: true
  };
};