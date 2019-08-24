/* ## Testing the User Authetication Server by listing all users ## */
"use strict"

import restify from "restify-clients";
import config from "config";
import util from "util";
import DBG from "debug";

const debug = DBG("platolio-users:service-list");
const error = DBG("platolio-users:error-list");

var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

client.basicAuth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");

client.get(config.get("routes.user.list"), (err, req, res, obj) => {
  err
  ? error(`list -- Something got worng while listing all users -- ${err.stack}`)
  : debug(`find users: ${util.inspect(obj)}`);
});
