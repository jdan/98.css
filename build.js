#!/usr/bin/env node
const fs = require("fs");
const mkdirp = require("mkdirp");
const postcss = require("postcss");

postcss()
  .use(require("postcss-inline-svg"))
  .use(require("postcss-css-variables"))
  .use(require("postcss-calc"))
  .use(require("postcss-copy")({ dest: "dist", template: "[name].[ext]" }))
  .use(require("cssnano"))
  .process(fs.readFileSync("style.css"), {
    from: "style.css",
    to: "dist/98.css",
    map: { inline: false },
  })
  .then((result) => {
    mkdirp.sync("dist");
    fs.writeFileSync("dist/98.css", result.css);
    fs.writeFileSync("dist/98.css.map", result.map);
  });
