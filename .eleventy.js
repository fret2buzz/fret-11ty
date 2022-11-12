const util = require('util');
const path = require('path');
const { DateTime } = require("luxon");
const fs = require('fs');
const markdown = require("markdown-it")({
    html: true
});

const projectRoot = process.cwd();
const conf = require(path.join(projectRoot, 'package.json')).config11ty;

const pathFiles = conf.pathFiles;

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path+'/'+file).isDirectory();
    });
}

const folders = getDirectories(pathFiles);

module.exports = function (config) {
    // config.addPassthroughCopy('src/favicon.ico');
    // config.addPassthroughCopy('src/css');
    // config.addPassthroughCopy('src/fonts');
    // config.addPassthroughCopy('src/images');

    config.addGlobalData("folders", folders);
    config.addGlobalData("pathFiles", pathFiles);

    folders.forEach(value => {
        config.addCollection(value, function (collectionApi) {
            let pathToFile = pathFiles + value;
            return collectionApi.getFilteredByGlob([pathToFile + "/**/*.njk", pathToFile + "/**/*.md"]);
        });
    });

    config.addGlobalData("siteName", conf.siteName);

    if (process.env.BUILD_ENV == 'production') {
        config.addGlobalData("dist", conf.dist);
    } else {
        config.addGlobalData("dist", "http://127.0.0.1:8080");
    }

    // config.setBrowserSyncConfig({
    //     files: ['./docs/css/*.css', './docs/js/*.js'],
    // });

    config.addPairedNunjucksShortcode("example", function(content, arr) {
        let newContent = `<div class="Box-row">${content}</div>`;
        let replaced = '';

        if (arr != undefined && Array.isArray(arr)) {
            arr.forEach(el => {
                replaced = content.replace("%%modifier%%", el);

                newContent = `
                    ${newContent}
                    <div class="Box-row">
                        <div class="pb-3"><strong class="f4">.${el}</strong></div>
                        ${replaced}
                    </div>
                `;
            });
        }

        let code =  `\`\`\`html${content}\`\`\``;
        code = `
            <div class="Box p-3">
                <details class="details-reset">
                    <summary class="btn">Show code</summary>
                    <div class="markdown-body mt-2">${markdown.render(code)}</div>
                </details>
            </div>
        `;
        return `
            <div class="l-fret11ty-flex">
                <div class="Box">
                    <div class="Box-header Box-header--blue">
                        <div class="Box-title f4">Example</div>
                    </div>
                    <div>
                        ${newContent}
                    </div>
                </div>
            </div>
            <div>
                ${code}
            </div>
        `;
    });

    config.addPairedNunjucksShortcode("markdown", function(content) {
        return `<div class="markdown-body">${markdown.render(content)}</div>`;
    });

    config.addFilter('console', function (value) {
        return util.inspect(value);
    });

    config.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: "Europe/Amsterdam",
        }).setLocale('en').toISODate();
    });

    // You can return your Config object (optional).
    return {
        dir: {
            input: 'src',
            output: 'docs',
            includes: 'includes',
            layouts: 'layouts',
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: false,
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        templateFormats: ['md', 'njk', '11ty.js'],
    };
};
