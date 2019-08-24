import DBG from "debug";
import util from "util";
import config from "config";
import * as UserModel from "../models/users-mongodb";

const debug = DBG("platolio-users:debug-users_controllers");
const error = DBG("platolio-users:error-users_controllers");

export default {
  async register(req, res, next) {
    try {
      const result = await UserModel.create(req.params.name, req.params.email,
        req.params.password, req.params.avatar, req.params.timestamp);
      debug(`create User -- ${util.inspect(result)}`);
      res.send(result);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.register")}: ${err.stack}`);
      next(false);
    }
  },

  async update(req, res, next) {
    try {
      const result = await UserModel.update(req.params.name, req.params.email, req.params.password);
      debug(`update User -- ${util.inspect(result)}`);
      res.send(UserModel.sanitizeUser(result));
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.update")}: ${err.stack}`);
      next(false);
    }
  },

  async findById(req, res, next) {
    try {
      const user = await UserModel.findById(req.params.userid);
      if (user.found) {
        debug(`find User by id -- ${util.inspect(user)}`);
        res.contentType = "json";
        res.send(user);
        next(false);
      } else {
        res.send(404, new Error(`Can't find user of id ${req.params.userid}`));
        next(false);
      }
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.findById")}: ${err.stack}`);
      next(false);
    }
  },

  async find(req, res, next) {
    try {
      const user = await UserModel.find(req.params.email);
      if (user.found) {
        debug(`find User -- ${util.inspect(user)}`);
        res.contentType = "json";
        res.send(user);
        next(false);
      } else {
        debug(`find No user -- ${util.inspect(user)}`);
        res.contentType = "json";
        res.send(user);
        next(false);
      }
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.find")}: ${err.stack}`);
      next(false);
    }
  },

  async checkPassword(req, res, next) {
    try {
      const checked = await UserModel.checkPassword(req.params.email, req.params.password);
      debug(`check User Password -- ${ util.inspect(checked)}`);
      res.contentType = "json";
      res.send(checked);
      next(false)
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.checkpassword")}: ${err.stack}`);
      next(false);
    }
  },

  async destroy(req, res, next) {
    try {
      await UserModel.destroy(req.params.userid);
      debug(`User of id ${req.params.userid} deleted`);
      res.send({});
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.destroy")}: ${err.stack}`);
      next(false);
    }
  },

  async list(req, res, next) {
    try {
      const users = await UserModel.list();
      res.send(users);
      next(false);
    } catch (err) {
      res.send(500, err);
      error(`${config.get("routes.user.list")}: ${err.stack}`);
      next(false);
    }
  }
}
