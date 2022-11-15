const util = require('util');
const path = require('path');
const { DateTime } = require("luxon");
const markdown = require("markdown-it")({
    html: true
});

const projectRoot = process.cwd();
const conf = require(path.join(projectRoot, 'package.json')).config11ty;

const pathFiles = conf.pathFiles;

const pathData = conf.pathData;
const folders = require(path.join(projectRoot, pathData + 'folders.json')).folders;

module.exports = function (config) {
    config.addFilter('console', function (value) {
        return util.inspect(value);
    });

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

    const mod = "%%modifier%%";
    const idx = "%%index%%";

    config.addPairedNunjucksShortcode("example", function(content, arr, indexed) {
        let replaced = content.replaceAll(mod, "");

        if (indexed == "indexed") {
            replaced = replaced.replaceAll(idx, "");
        }

        let newContent = `<div class="Box-row">${replaced}</div>`;

        if (arr != undefined && Array.isArray(arr)) {
            arr.forEach((el, index) => {

                let replaced = content.replaceAll(mod, el);

                if (indexed == "indexed") {
                    let i = index + 1;
                    replaced = replaced.replaceAll(idx, i);
                }

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
        return `
            <div class="markdown-body">
                ${markdown.render(content)}
            </div>
        `;
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
