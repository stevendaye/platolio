/*## Query the User Authentication Server ##*/
import request from "superagent";
import util from "util";
import url from "url";
import DBG from "debug";
import config from "config";

const URL = url.URL;
const debug = DBG("platilio:user-superagent");
const error = DBG("platilio:error-superagent");

const reqURL = path => {
  const requrl = new URL(process.env.USER_MICROSERVICE_URL);
  requrl.pathname = path;
  return requrl.toString();
};

// Query the user microservice for CRUD
async function create(name, email, password, avatar, timestamp) {
  let res = await request
    .post(reqURL(config.get("routes.user.register")))
    .withCredentials()
    .send({name, email, password, avatar, timestamp })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Create -- name: ${name}, password: ${password}, email: ${email},
  avatar: ${avatar}, timestamp: ${timestamp}`);
  return res.body;
}

async function update(name, email, password, avatar, timestamp) {
  let res = await request
    .put(reqURL(`${config.get("routes.user.update")}/${email}`))
    .withCredentials()
    .send({name, password, email, avatar, timestamp })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Update -- ${util.inspect(res.body)}`);
  return res.body;
}

async function findById(id) {
  let res = await request
    .get(reqURL(`${config.get("routes.user.findById")}/${id}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Find user byId -- ${util.inspect(res.body)}`);
  return res.body;
}

async function find(email) {
  let res = await request
    .get(reqURL(`${config.get("routes.user.find")}/${email}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Find user by Email -- ${util.inspect(res.body)}`);
  return res.body;
}

async function checkPassword(email, password) {
  let res = await request
  .post(reqURL(`${config.get("routes.user.checkpassword")}`))
  .withCredentials()
  .send({ email, password })
  .set("Content-Type", "application/json")
  .set("Accept", "application/json")
  .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`CheckPassword -- ${util.inspect(res.body)}`);
  return res.body;
}

async function destroy(userid) {
  let res = await request
    .del(reqURL(`${config.get("routes.user.destroy")}/${userid}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`delete -- ${util.inspect(res.body)}`);
  return res.body;
}

async function list() {
  let res = await request
    .del(reqURL(`${config.get("routes.user.list")}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`list -- ${util.inspect(res.body)}`);
  return res.body;
}

export { create, update, find, findById, checkPassword, destroy, list };
