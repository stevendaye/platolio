/* ## Testing the User Authetication Server by reading a user ## */
"use strict"

import restify from "restify-clients";
import util from "util";
import DBG from "debug";

const debug = DBG("platolio-users:service-find");
const error = DBG("platolio-users:error-find");

var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

client.basicAuth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");

client.get(`/user/find/${process.argv[2]}`, (err, req, res, obj) => {
  err
  ? error(`find -- Someting got wrong while reading user of email ${process.argv[2]} \n ${err.stack}`)
  : debug(`find user: ${util.inspect(obj)}`);
});
