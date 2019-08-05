import http from "http";
import express from "express";
import DBG from "debug";
import util from "util";
import config from "config";
import connectDB from "./config/db";

const app = express();
const server = http.createServer(app);
const port = normalizePort(config.get("port"));
connectDB();

const debug = DBG("platolio:server-app");
const error = DBG("platolio:error-app");

app.set("port", port);
app.set("view engine", "react");

app.get("/", (req, res, next) => {
  res.send("Platolio is being build. Come back later. Thanks");
});

app.on("uncaughtException", err => {
  error(`I crashed! - ${(err.stack || err)}`);
});
app.on("unhandledRejection", (reason, p) => {
  error(`Unhandled Promise Rejection at: ${util.inspect(p)} -- Reason: ${reason}`);
});

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port
  }
  return false;
}

function onError() {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // Handling specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "Pipe " + addr : addr.port;
  debug(`Server listening at http://localhost:${bind}`);
}
