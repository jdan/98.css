#!/usr/bin/env node
const dedent = require("dedent");
const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const hljs = require("highlight.js");
const mkdirp = require("mkdirp");
const path = require("path");
const postcss = require("postcss");

const { homepage, version } = require("./package.json");

function buildCSS(preserveVariables) {
  const input =
    `/*! 98.css v${version} - ${homepage} */\n` + fs.readFileSync("style.css");
  const destination = preserveVariables ? "dist/98-full.css" : "dist/98.css";
  const template = preserveVariables ? "[name]-full.[ext]" : "[name].[ext]";

  return postcss()
    .use(require("postcss-inline-svg"))
    .use(require("postcss-css-variables")({ preserve: preserveVariables }))
    .use(require("postcss-calc"))
    .use(require("postcss-copy")({ dest: "dist", template }))
    .use(require("cssnano"))
    .process(input, {
      from: "style.css",
      to: destination,
      map: { inline: false },
    })
    .then((result) => {
      mkdirp.sync("dist");
      fs.writeFileSync(destination, result.css);
      fs.writeFileSync(destination + ".map", result.map.toString());
    });
}

function buildDocs() {
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

  glob("docs/*", (err, files) => {
    if (!err) {
      files.forEach((srcFile) =>
        fs.copyFileSync(srcFile, path.join("dist", path.basename(srcFile)))
      );
    } else throw "error globbing dist directory.";
  });
  fs.writeFileSync(
    path.join(__dirname, "/dist/index.html"),
    ejs.render(template, { getNewId, getCurrentId, example })
  );
}

function build() {
  buildCSS(false)
    .then(() => buildCSS(true))
    .then(buildDocs)
    .catch((err) => console.log(err));
}
module.exports = build;

build();
