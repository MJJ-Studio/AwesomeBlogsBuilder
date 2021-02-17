const fs = require('fs');
const axios = require('axios');
const assert = require('assert');
const argv = process.argv;
assert.ok(argv.length <= 2, "No File changes!");
axios.defaults.timeout = 90000;
for (let i = 2; i < argv.length; ++i) {
    const data = JSON.parse(fs.readFileSync(argv[i], "utf-8"));
    const type = ["tech", "host", "life", "domain", "probe"];
    assert.ok(!data["blogName"] || !data["blogLink"] || !data["type"] || type.indexOf(data["type"]) === -1, "数据有误");
    assert.doesNotThrow(() => {
        new URL(data["blogLink"])
    }, "检测URL是否合法");
    (async () => {
        await assert.doesNotReject(axios.get(data["blogLink"]), "无法正常访问");
    })()
}
