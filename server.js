const chokidar = require("chokidar");
const handler = require("serve-handler");
const http = require("http");

const build = require("./build");

chokidar
  .watch(["style.css", "build.js", "docs", "fonts", "icon"], {
    usePolling: true,
  })
  .on("change", (file) => {
    console.log(
      `[${new Date().toLocaleTimeString()}] ${file} changed -- rebuilding...`
    );
    build();
  });

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: "dist",
  });
});

server.listen(3000, () => {
  console.log("Running at http://localhost:3000");
});
