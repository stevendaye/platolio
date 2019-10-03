import express from "express";
import { check } from "express-validator/check";
import config from "config";
import user from "../controllers/users";
import * as utils from "../middlewares/utilities";

const router = express.Router();

const usersRoutes = app => {
  router.post(config.get("routes.user.register"), [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please provide a valid email address").isEmail(),
    check("password", "Please provide a password with 6 or more characters").isLength({ min: 6 })
  ], user.register);

  router.post(config.get("routes.user.login"), [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password is required").exists()
  ], user.login);
  
  app.use(router);
};

export default usersRoutes;
