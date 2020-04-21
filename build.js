#!/usr/bin/env node
const ejs = require("ejs");
const fs = require("fs");

let id = 0;
function getNewId() {
  return ++id;
}
function getCurrentId() {
  return id;
}

function example(code) {
  const magicBrackets = /\[\[(.*)\]\]/g;
  const inline = code.replace(magicBrackets, "$1");
  const escaped = code
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

  fs.writeFileSync(
    "./docs/index.html",
    ejs.render(template, { getNewId, getCurrentId, example })
  );
}

buildDocs();
