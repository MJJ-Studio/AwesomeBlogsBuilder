//collect all .json
const fs = require('fs').promises;
const path = require('path');
const _ = require('lodash');
const arr = {
    "tech": [],
    "host": [],
    "life": [],
    "domain": [],
    "probe": []
};
const Init = async (dir) => {
    const Resolve = p => path.resolve(dir, p);
    const files = await fs.readdir(dir);
    for (let file of files) {
        if (path.extname(file) !== ".json") continue;
        const filePath = Resolve(file);
        const d = JSON.parse(await fs.readFile(filePath, "utf-8"));
        arr[d["type"]].push(d);
    }
    for (let type of ["tech", "host", "life", "domain", "probe"])
        arr[type] = _.shuffle(arr[type]);
    return arr;
}
module.exports = Init;