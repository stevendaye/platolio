import http from "http";
import express from "express";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import logger from "morgan";
import cors from "cors";
import DBG from "debug";
import util from "util";
import path from "path";
import config from "config";
import { notFound, err } from "./middlewares/errorhandler";
import * as log from "./middlewares/log";
// import { dbType } from "./models/posts/posts-model-type";
import connectDB from "./config/db";
import homeRoutes from "./routes/index";
import usersRoutes from "./routes/users";
import profilesRoutes from "./routes/profile";
import postsRoutes from "./routes/posts";

const app = express();
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || config.get("port"));

// if (dbType === "MongoDB") {
  connectDB();
// }

const debug = DBG("platolio:server-app");
const error = DBG("platolio:error-app");

app.set("port", port);
app.set("view engine", "react");
app.set("views", path.join(__dirname, "views"));
// app.use(favicon(path.join(__dirname, "static", "platolio.ico")));
app.use(logger(process.env.REQUEST_LOG_FILE || "dev", {
  stream: log.logStream ? log.logStream : process.stdout
}));
app.use(express.static(`${__dirname}/static`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enabling CORS Access from the server to be used by the user microservice server
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", config.get("host.platform"));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

process.on("uncaughtException", err => {
  error(`I crashed! - ${(err.stack || err)}`);
});
process.on("unhandledRejection", (reason, p) => {
  error(`Unhandled Promise Rejection at: ${util.inspect(p)} -- Reason: ${reason}`);
});

homeRoutes(app);
usersRoutes(app);
profilesRoutes(app);
postsRoutes(app);

app.use(notFound);
app.use(err);

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
