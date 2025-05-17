const chokidar = require("chokidar");
const build = require("./build");

chokidar
  .on("change", (file) => {
    console.log(
      `[${new Date().toLocaleTimeString()}] ${file} changed -- rebuilding...`
    );
    build();
    console.log('asdj')
  });

var liveServer = require("live-server");
liveServer.start({ port: 3000, root: "dist" });
