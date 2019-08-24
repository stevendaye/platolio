import DBG from "debug";
import util from "util";
import config from "config";
import * as ProfileModel from "../models/profile-mongodb";

const debug = DBG("platolio-users:debug-profile_controllers");
const error = DBG("platolio-users:error-profile_controllers");

export default {
  async create(req, res, next) {
    try {
      const result = await ProfileModel.create(req.params.userid, req.params.company, req.params.website,
        req.params.location, req.params.bio, req.params.status, req.params.githubusername, req.params.skills,
        req.params.twitter, req.params.linkedin, req.params.facebook, req.params.instagram, req.params.youtube,
        req.params.timestamp);
      debug(`create Profile -- ${util.inspect(result)}`);
      res.send(result);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.create")}: ${err.stack}`);
      next(false);
    }
  },

  async update(req, res, next) {
    try {
      const result = await ProfileModel.update(req.params.userid, req.params.company, req.params.website,
        req.params.location, req.params.bio, req.params.status, req.params.githubusername, req.params.skills,
        req.params.twitter, req.params.linkedin, req.params.facebook, req.params.instagram, req.params.youtube,
        req.params.timestamp);
      debug(`update Profile -- ${util.inspect(result)}`);
      res.send(result);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.update")}: ${err.stack}`);
      next(false);
    }
  },
  
 async find(req, res, next) {
    try {
      const profile = await ProfileModel.find(req.params.userid);
      if (profile.found) {
        debug(`find Profile -- ${util.inspect(profile)}`);
        res.contentType = "json";
        res.send(profile);
        next(false);
      } else {
        debug(`find No Profile -- ${util.inspect(profile)}`);
        res.contentType = "json";
        res.send(profile);
        next(false);
      }
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.find")}: ${err.stack}`);
      next(false);
    }
  },

  async updateExperience(req, res, next) {
    try {
      const profile = await ProfileModel.updateExperience(req.params.userid, req.params.newExperience);
      debug(`New Experience Added -- ${profile}`);
      res.send(profile);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.updateExperience")}: ${err.stack}`);
      next(false);
    }
  },

  async removeExperience(req, res, next) {
    try {
      const profile = await ProfileModel.removeExperience(req.params.userid, req.params.expid);
      debug(`Experience Removed -- ${profile}`);
      res.send(profile);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.removeExperience")}: ${err.stack}`);
      next(false);
    }
  },

  async updateEducation(req, res, next) {
    try {
      const profile = await ProfileModel.updateEducation(req.params.userid, req.params.newEducation);
      debug(`New Education Added -- ${profile}`);
      res.send(profile);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.updateEducation")}: ${err.stack}`);
      next(false);
    }
  },

  async removeEducation(req, res, next) {
    try {
      const profile = await ProfileModel.removeEducation(req.params.userid, req.params.eduid);
      debug(`Education Removed -- ${profile}`);
      res.send(profile);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.removeEducation")}: ${err.stack}`);
      next(false);
    }
  },

  async destroy(req, res, next) {
    try {
      await ProfileModel.destroy(req.params.userid);
      debug(`Profile of user ${req.params.userid} deleted`);
      res.send({});
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.destroy")}: ${err.stack}`);
      next(false);
    }
  },

  async list(req, res, next) {
    try {
      const profiles = await ProfileModel.list();
      debug(`find Profiles -- ${util.inspect(profiles)}`);
      res.send(profiles);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.profile.list")}: ${err.stack}`);
      next(false);
    }
  }
}
