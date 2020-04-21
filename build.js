#!/usr/bin/env node
const dedent = require("dedent");
const ejs = require("ejs");
const fs = require("fs");
const hljs = require("highlight.js");
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

function buildDocs() {
  const template = fs.readFileSync("docs/index.html.ejs", "utf-8");

  fs.copyFileSync("build/98.css", "docs/98.css");
  fs.writeFileSync(
    "docs/index.html",
    ejs.render(template, { getNewId, getCurrentId, example })
  );
}

function buildCSS() {
  return postcss()
    .use(require("postcss-inline-svg"))
    .use(require("postcss-css-variables")({ preserve: "computed" }))
    .use(require("postcss-calc"))
    .process(fs.readFileSync("style.css"), {
      from: "style.css",
      to: "build/98.css",
    })
    .then((result) => {
      mkdirp.sync("build");
      fs.writeFileSync("build/98.css", result.css);
    });
}

buildCSS().then(buildDocs);
