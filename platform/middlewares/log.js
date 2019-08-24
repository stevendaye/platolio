/* ## Setting up Logging Requests to log to a file if requested ## */
import path from "path";
import fs from "fs-extra";
import rfs from "rotating-file-stream"; // Not in package.json

var logStream;
if (process.env.REQUEST_LOG_FILE) {
  (async () => {
    let logDirectory = path.dirname(process.env.REQUEST_LOG_FILE);
    await fs.ensureDir(logDirectory);
    logStream = rfs(process.env.REQUEST_LOG_FILE, {
      size: "10M",
      interval: "1d",
      compress: "gzip"
    });
  })().catch(err => console.log(err));
}

export { logStream };
