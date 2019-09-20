import express from "express";
import config from "config";
import home from "../controllers/index";
import * as utils from "../middlewares/utilities";

const router = express.Router();

const homeRoutes = app => {
  router.get(config.get("routes.index"), utils.checkAuthentication, home.index);
  
  app.use(router);
};

export default homeRoutes;
