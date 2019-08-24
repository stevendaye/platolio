/* ## Testing the User Authetication Server by deleting a user ## */
"use strict"

import restify from "restify-clients";
import util from "util";
import DBG from "debug";

const debug = DBG("platolio-users:service-destroy");
const error = DBG("platolio-users:error-destroy");

var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

client.basicAuth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");

client.del(`/user/destroy/${process.argv[2]}`, (err, req, res, obj) => {
  err
  ? error(`delete -- Something got worng while deleting user of email ${process.argv[2]} \n ${err.stack}`)
  : debug(`delete user: ${util.inspect(obj)}`);
});
