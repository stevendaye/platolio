/* ## Testing the User Authetication Server by creating a user ## */
"use strict";

import restify from "restify-clients";
import DBG from "debug";
import util from "util";
import bcrypt from "bcryptjs";

const debug = DBG("platolio-users:service-update");
const error = DBG("platolio-users:error-update");

// Creating the Client Object
var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

// Setting the HTTP basicAuth to be read in req.authorization.basic
client.basicAuth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");

const password = "stevenShneider";
async function encrypted() {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  } catch (err) {
    error(`Password encryption failed -- ${err.stack}`);
  }
}
(async () => {
  client.put(`/user/update/${process.argv[2]}`, {
    name: "Steven Shneider", email: "steevegrider@gmail.com",
    password: await encrypted() }, (err, req, res, obj) => {
    err
    ? error(`update -- Something got wrong when updating the user of email ${process.argv[2]} \n ${err.stack}`)
    : debug(`update User -- ${util.inspect(obj)}`);
});
})().catch(err => error(err));
