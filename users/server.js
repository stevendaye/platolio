/*## Setting up a REST Server for the User Microservice ## */
import restify from "restify";
import DBG from "debug";
import util from "util";
import usersRoutes from "./routes/users";
import profilesRoutes from "./routes/profile";
import connectDB from "./config/db";

const debug = DBG("platolio-users:server-service");
const error = DBG("platolio-users:server-error");

// Create a Restify Server
const server = restify.createServer({
  name: "User-Auth-Service",
  version: "0.0.1"
});

connectDB();

// Configure handler functions to read HTTP basic headers and accept request
server.use(restify.plugins.authorizationParser());
server.use(check);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
  mapParams: true
}));
server.on("uncaughtException", (err, req, res, next) => {
  error(`Uncaught Exception -- ${err.stack}`);
});

usersRoutes(server);
profilesRoutes(server);

// Mimicing API Key Autentication to have access to the user information server
var apiKeys = [{
  user: "unwhite",
  key: "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D"
}];

// Check Middleware
function check(req, res, next) {
  if (req.authorization && req.authorization.basic) {
    var BASICS_FOUND = false;
    for (let auth of apiKeys) {
      if (auth.key === req.authorization.basic.password
        && auth.user === req.authorization.basic.username) {
          BASICS_FOUND = true;
          break;
      }
    }
    if (BASICS_FOUND) {
      next();
      debug("Successfully Authenticated!");
    } else {
      res.send(401, new Error("Third Party Server Not Authenticated"));
      error(`BASCIS_FOUND = ${BASICS_FOUND} -- Access Denied`);
      next(false);
    }
  } else {
    res.send(500, new Error("No Authorization Key Found"));
    error(`No Authorization Key Found - ${util.inspect(req.authorization.basic)}`);
    next(false);
  }
}

export default check;
