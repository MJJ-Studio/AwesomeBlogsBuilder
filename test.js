const fs = require('fs');
const axios = require('axios');
const argv = process.argv;
if (argv.length <= 2) throw("No File changes!");
axios.defaults.timeout = 90000;
for (let i = 2; i < argv.length; ++i) {
    const data = JSON.parse(fs.readFileSync(argv[i], "utf-8"));
    const type = ["tech", "host", "life", "domain", "probe"];
    if (!data["blogName"] || !data["blogLink"] || !data["type"] || type.indexOf(data["type"]) === -1) throw("再检查一下？");
    new URL(data["blogLink"]);
    axios.get(data["blogLink"]);
}