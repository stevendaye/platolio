import DBG from "debug";
import * as UserModel from "../models/users/users-queries";

const debug = DBG("platolio:controller-index");
const error = DBG("platolio:error-index");

export default {
  async index(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id);
      res.json(user.sanitize);
      debug(`find user: ${user}`);
    } catch (err) {
      error(`An error occured when getting the user of id ${req.user.id}`);
      res.status(500).send("Server Error");
    }
  }
}
