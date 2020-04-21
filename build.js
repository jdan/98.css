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

function buildDocs() {
  const template = fs.readFileSync("./docs/index.html.ejs", "utf-8");

  fs.writeFileSync(
    "./docs/index.html",
    ejs.render(template, { getNewId, getCurrentId })
  );
}

buildDocs();
