const util = require('util');
const path = require('path');
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const projectRoot = process.cwd();
const conf = require(path.join(projectRoot, 'package.json')).config11ty;

const pathFiles = conf.pathFiles;

const pathData = conf.pathData;
const folders = require(path.join(projectRoot, pathData + 'folders.json')).folders;

module.exports = function (config) {
    config.addFilter('console', function (value) {
        return util.inspect(value);
    });

    config.addPlugin(syntaxHighlight);

    config.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: "Europe/Amsterdam",
        }).setLocale('en').toISODate();
    });

    folders.forEach(value => {
        config.addCollection(value.name, function (collectionApi) {
            if (value.files) {
                let pathToFile = pathFiles + value.path;
                return collectionApi.getFilteredByGlob([pathToFile + "/*.njk", pathToFile + "/*.md"]).sort(function(a, b) {
                    return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
                });
            }
        });
    });

    config.addGlobalData("siteName", conf.siteName);


    // You can return your Config object (optional).
    return {
        dir: {
            input: 'src',
            output: 'docs',
            includes: 'includes',
            layouts: 'layouts',
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        templateFormats: ['md', 'njk', '11ty.js'],
    };
};
