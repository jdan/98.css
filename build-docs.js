#!/usr/bin/env node
const dedent = require("dedent");
const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const hljs = require("highlight.js");
const path = require("path");

let id = 0;
function getNewId() {
  return ++id;
}
function getCurrentId() {
  return id;
}

const template = fs.readFileSync("docs/index.html.ejs", "utf-8");

function example(code) {
  const magicBrackets = /\[\[(.*)\]\]/g;
  const dedented = dedent(code);
  const inline = dedented.replace(magicBrackets, "$1");
  const escaped = hljs.highlight("html", dedented.replace(magicBrackets, ""))
    .value;

  return `<div class="example">
    ${inline}
    <details>
      <summary>Show code</summary>
      <pre><code>${escaped}</code></pre>
    </details>
  </div>`;
}

glob("dist/*", (err, files) => {
  if (!err) {
    files.forEach((srcFile) =>
      fs.copyFileSync(srcFile, path.join("docs", path.basename(srcFile)))
    );
  } else throw "error globbing dist directory.";
});
fs.writeFileSync(
  "docs/index.html",
  ejs.render(template, { getNewId, getCurrentId, example })
);
