import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import htmlnano from "htmlnano";

import buildTimestampFilter from "./filters/buildTimestamp.js";
import dateDisplayFilter from "./filters/dateDisplay.js";
import getSiblingPageFilter from "./filters/getSiblingPage.js";
import httpUrlFilter from "./filters/httpUrl.js";
import imageDimensionsFilter from "./filters/imageDimensions.js";
import pageTitleFilter from "./filters/pageTitle.js";
import postImageFilter from "./filters/postImage.js";
import removeIndexHtmlFilter from "./filters/removeIndexHtml.js";
import sectionFilter from "./filters/section.js";
import squashFilter from "./filters/squash.js";
import timestampFilter from "./filters/timestamp.js";

import { createRequire } from "module";

const require = createRequire(import.meta.url);
const cfg = require("./input/_data/cfg.json");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
  eleventyConfig.addFilter("buildTimestamp", buildTimestampFilter);
  eleventyConfig.addFilter("dateDisplay", dateDisplayFilter);
  eleventyConfig.addFilter("getSiblingPage", getSiblingPageFilter);
  eleventyConfig.addFilter("httpUrl", httpUrlFilter);
  eleventyConfig.addFilter("imageDimensions", imageDimensionsFilter);
  eleventyConfig.addFilter("pageTitle", pageTitleFilter);
  eleventyConfig.addFilter("postImage", postImageFilter);
  eleventyConfig.addFilter("removeIndexHtml", removeIndexHtmlFilter);
  eleventyConfig.addFilter("section", sectionFilter);
  eleventyConfig.addFilter("squash", squashFilter);
  eleventyConfig.addFilter("timestamp", timestampFilter);

  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy(".htaccess");

  eleventyConfig.addCollection("work", function (collection) {
    return collection.getFilteredByTag("work").reverse();
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addTransform("htmlnano", async function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      return await htmlnano.process(content)
        .then(function (result) {
          return result.html;
      })
    }
    return content;
  });

  eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 0,      // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Roland Toth's Portfolio",
			subtitle: "design+develop",
			base: "https://rolandtoth.hu/",
			author: {
				name: "Roland Toth",
				email: "contact@rolandtoth.hu",
			}
		}
	});

  return {
    dir: {
      input: "input",
      data: "_data",
      output: "dist",
      includes: "includes"
    },
    pathPrefix: cfg.pathPrefix,
    templateFormats: ["njk", "md", "json"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: false,
    passthroughFileCopy: true,
  };
};
