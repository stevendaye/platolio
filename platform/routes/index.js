import express from "express";
import home from "../controllers/index";
import * as utils from "../middlewares/utilities";

const router = express.Router();

const postsRoutes = (app) => {
  router.get("/", utils.checkAuthentication, home.index);
  
  app.use(router);
};

export default postsRoutes;
