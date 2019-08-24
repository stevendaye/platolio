/* ## Testing the User Authetication Server by creating a user ## */
"use strict";

import restify from "restify-clients";
import DBG from "debug";
import util from "util";
import gavatar from "gravatar";
import bcrypt from "bcryptjs";
import md5 from "md5";
import config from "config";

const debug = DBG("platolio-users:service-register");
const error = DBG("platolio-users:error-register");

// Creating the Client Object
var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

// Setting the HTTP basicAuth to be read in req.authorization.basic
client.basicAuth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");

const avatar = gavatar.url(md5("jameskila@gmail.com"), { s: 200, r: "pg", d: "mm" });
const timestamp = new Date();

const password = "steeveGrider";
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
  client.post(config.get("routes.user.register"), {
    name: "Steeve Grider", email: "steevegrider@gmail.com",
    password: await encrypted(), avatar, timestamp }, (err, req, res, obj) => {
    err
    ? error("create -- Something got wrong when registering the user")
    : debug(`create User -- ${util.inspect(obj)}`);
  });
})().catch(err => error(err));
