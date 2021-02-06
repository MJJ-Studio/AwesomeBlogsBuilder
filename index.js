const fs = require('fs');
const Init = require('./build');
const json2md = require('json2md');
const _ = require('lodash');
json2md.converters.render = (d, json2md) => {
    return `**${d["blogName"]}**：${d["blogLink"]} By ${json2md({
        link: {title: d["owner"], source: d["locURL"]}
    })}`;
}
Init('./raw').then(initData => {
    const box = {
        "tech": "技术博客",
        "host": "主机博客",
        "life": "生活博客",
        "domain": "米表",
        "probe": "以针会友"
    }
    const preData = json2md([
        {h1: "AwesomeBlogs"},
        {p: "这里汇总了MJJ的博客，每周更新，顺序随机"}
    ], "");
    //添加目录（需要的情况下）
    //tech
    const data = {
        "tech": "",
        "host": "",
        "life": "",
        "domain": "",
        "probe": ""
    }
    let str = "";
    for (let type of _.shuffle(["tech", "host", "life", "domain", "probe"])) {
        data[type] += json2md({
            h2: box[type]
        }, "");
        let index = 0;
        for (let item of initData[type]) {
            data[type] += `${++index}：`
            data[type] += json2md({
                render: item
            }, "");
            if (item["description"]) data[type] += `${json2md({
                blockquote: item["description"]
            }, "")}\n`;
        }
        str += data[type];
    }
    console.log(preData + str);
}).catch(err => {
    console.log(err);
    process.exit(1);
})