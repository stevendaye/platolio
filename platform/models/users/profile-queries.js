import request from "superagent";
import util from "util";
import DBG from "debug";
import config from "config";

const debug = DBG("platilio:-debug-profiles_superagent");
const error = DBG("platilio:error-profiles_superagent");

const reqURL = path => {
  const requrl = new URL(process.env.USER_MICROSERVICE_URL);
  requrl.pathname = path;
  return requrl.toString();
};

async function create(userid, company, website, location, bio, status, githubusername,
  skills, twitter, linkedin, facebook, instagram, youtube, timestamp) {
  let res = await request
    .post(reqURL(config.get("routes.user.profile.create")))
    .withCredentials()
    .send({userid, company, website, location, bio, status, githubusername,
      skills, twitter, linkedin, facebook, instagram, youtube})
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Create Profile -- userid: ${userid}, company: ${company}, website: ${website},
  location: ${location}, bio: ${bio}, status: ${githubusername}, skills: ${skills},
  twitter: ${twitter}, linkedin: ${facebook}, instagram: ${youtube}, timestamp: ${timestamp}`);
  return res.body;
}

async function update(userid, company, website, location, bio, status, githubusername,
  skills, twitter, linkedin, facebook, instagram, youtube, timestamp) {
    let res = await request
    .put(reqURL(`${config.get("routes.user.profile.update")}`))
    .withCredentials()
    .send({userid, company, website, location, bio, status, githubusername,
      skills, twitter, linkedin, facebook, instagram, youtube, timestamp})
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Updated Profile -- userid: ${userid}, company: ${company}, website: ${website},
  location: ${location}, bio: ${bio}, status: ${githubusername}, skills: ${skills},
  twitter: ${twitter}, linkedin: ${facebook}, instagram: ${youtube}, timestamp: ${timestamp}`);
  return res.body;
}

async function findCurrent(userid) {
  let res = await request
    .get(reqURL(`${config.get("routes.user.profile.current")}/${userid}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Find Current Profile -- ${util.inspect(res.body)}`);
  return res.body;
}

async function find(userid) {
  let res = await request
    .get(reqURL(`${config.get("routes.user.profile.find")}/${userid}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Find Profile -- ${util.inspect(res.body)}`);
  return res.body;
}

async function updateExperience(userid, newExperience) {
  let res = await request
    .put(reqURL(`${config.get("routes.user.profile.updateExperience")}`))
    .withCredentials()
    .send({ userid, newExperience })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Updated Profile Experience -- ${util.inspect(res.body)}`);
  return res.body;
}

async function removeExperience(userid, expid) {
  let res = await request
    .del(reqURL(`${config.get("routes.user.profile.removeExperience")}/${userid}/${expid}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Removed Profile Experience -- ${util.inspect(res.body)}`);
  return res.body;
}

async function updateEducation(userid, newEducation) {
  let res = await request
    .put(reqURL(`${config.get("routes.user.profile.updateEducation")}`))
    .withCredentials()
    .send({ userid, newEducation })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Updated Profile Education -- ${util.inspect(res.body)}`);
  return res.body;
}

async function removeEducation(userid, eduid) {
  let res = await request
    .del(reqURL(`${config.get("routes.user.profile.removeEducation")}/${userid}/${eduid}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Removed Profile Experience -- ${util.inspect(res.body)}`);
  return res.body;
}

async function destroy(userid) {
  let res = await request
    .del(reqURL(`${config.get("routes.user.profile.destroy")}/${userid}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`delete -- ${util.inspect(res.body)}`);
  return res.body;
}

async function list() {
  let res = await request
    .get(reqURL(`${config.get("routes.user.profile.list")}`))
    .withCredentials()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .auth("unwhite", "1M7LK94FHGS7-USG3-7YHD-DLKHC98N-K79D");
  debug(`Find Profile -- ${util.inspect(res.body)}`);
  return res.body;
}

export { create, update, find, findCurrent, updateExperience, updateEducation,
  removeExperience, removeEducation, destroy, list };
