#!/usr/bin/env node
const dedent = require("dedent");
const ejs = require("ejs");
const fs = require("fs");
const mkdirp = require("mkdirp");
const postcss = require("postcss");

let id = 0;
function getNewId() {
  return ++id;
}
function getCurrentId() {
  return id;
}

function example(code) {
  const magicBrackets = /\[\[(.*)\]\]/g;
  const dedented = dedent(code);
  const inline = dedented.replace(magicBrackets, "$1");
  const escaped = dedented
    .replace(magicBrackets, "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<div class="example">
    ${inline}
    <details>
      <summary>Show code</summary>
      <pre><code>${escaped}</code></pre>
    </details>
  </div>`;
}

function buildDocs() {
  const template = fs.readFileSync("./docs/index.html.ejs", "utf-8");

  fs.copyFileSync("./build/style.css", "./docs/style.css");
  fs.writeFileSync(
    "./docs/index.html",
    ejs.render(template, { getNewId, getCurrentId, example })
  );
}

function buildCSS() {
  return postcss()
    .use(require("postcss-inline-svg"))
    .process(fs.readFileSync("./style.css"), {
      from: "style.css",
      to: "./build/style.css",
    })
    .then((result) => {
      mkdirp.sync("./build");
      fs.writeFileSync("./build/style.css", result.css);
    });
}

buildCSS().then(buildDocs);
