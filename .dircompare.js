const dircompare = require('dir-compare');
const path = require('path');
const fs = require('fs');

const projectRoot = process.cwd();
const conf = require(path.join(projectRoot, 'package.json')).config11ty;

const options = {
    compareSize: false,
    compareContent: false,
    compareNameHandler: customNameCompare,
    ignoreExtension: true,
    excludeFilter: "*.js"
 };

function customNameCompare(name1, name2, options) {
    if (options.ignoreCase) {
        name1 = name1.toLowerCase();
        name2 = name2.toLowerCase();
    }
    if (options.ignoreExtension) {
        name1 = path.basename(name1, path.extname(name1));
        name2 = path.basename(name2, path.extname(name2));
    }
    return ((name1 === name2) ? 0 : ((name1 > name2) ? 1 : -1))
}

const path1 = conf.pathFiles;
const path2 = conf.pathStyles;

// Asynchronous
dircompare.compare(path1, path2, options)
  .then(res => print(res))
  .catch(error => console.error(error));

function print(res) {
    console.log(`Same: ${res.same}`)
    if (!res.diffSet) {
        return;
    }

    let list = [];
    res.diffSet.forEach(dif => {
        list.push(dif.relativePath);
    });

    list = list.filter(function (x, i, a) {
        return a.indexOf(x) == i;
    });

    let arr = [];
    list.forEach(el => {
        let item = res.diffSet.filter(element => {
            if (element.type1 === 'directory' || element.type2 === 'directory') {
                return false;
            }
            return element.relativePath === el;
        });
        let key = el.replace("\\","");
        key = (key == '') ? 'root' : key;
        let obj = {
            "folder": key,
            "files": item
        };
        arr.push(obj);
    });
    let finalResult = {
        "title": "Files comparison",
        "comparison": arr
    };

    finalResult = JSON.stringify(finalResult, null, 2);

    fs.writeFile(conf.pathPages + "comparison.json", finalResult, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
