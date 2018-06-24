const mkdirp = require('mkdirp');
const fs = require("fs");
const qa = require("cli-qa")();
const slugify = require("slug");

qa.ask('{bold}{blue}Title:{reset}');
qa.ask('{bold}{blue}Subtitle:{reset}');
qa.ask({
    key: 'date',
    title: '{bold}{blue}Date (leave empty if now):{reset}'
});
qa.ask({
    key: 'file',
    title: '{bold}{blue}Blog file name:{reset}'
});

qa.start(answers => {
    const date = (answers.date === '') ? new Date() : new Date(answers.date);
    const slug = slugify(answers.title);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const filename = __dirname + `/posts/${year}-${month}-${day}-${slug}.md`;
    const content = fs.readFileSync(__dirname + '/' + answers.file);
    const frontmatter = `---
title: "${answers.title}"
subtitle: "${answers.subtitle}"
date: "${date.toISOString()}"
path: "/posts/${year}/${month}/${day}/${slug}"
---

${content}
`;

    let makepost = (path, contents, cb) => {
        mkdirp('posts', function (err) {
            if (err) return cb(err);

            fs.writeFile(path, contents, cb);
        });
    };

    let printResult = (err) => {
        if (err) throw err
        console.log('Done! Created ' + filename);
    };

    makepost(filename, frontmatter, printResult);
})
