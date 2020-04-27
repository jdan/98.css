const chokidar = require("chokidar");
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

var liveServer = require("live-server");
liveServer.start({ port: 3000, root: "dist" });
