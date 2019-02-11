var browserSync = require('browser-sync').create();
browserSync.init({
		port: 8081,
    // browser: ["google chrome canary"],
    server: {
      baseDir: "./",
      directory: true
    }
  });