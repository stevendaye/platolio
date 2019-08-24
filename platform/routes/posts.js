import express from "express";
import { check } from "express-validator";
import config from "config";
import * as utils from "../middlewares/utilities";
import post from "../controllers/posts";

const router = express.Router();

const postsRoutes = app => {
  router.post(config.get("routes.post.add"), [ utils.checkAuthentication, [
    check("text", "Text is required").not().isEmpty() ]
  ], post.create);

  router.put(config.get("routes.post.edit") + "/:post_id", utils.checkAuthentication, post.update);
  router.get(config.get('routes.post.read') + "/:post_id", utils.checkAuthentication, post.read);

  router.put(config.get("routes.post.like") + "/:post_id", utils.checkAuthentication, post.like);
  router.put(config.get("routes.post.unlike") + "/:post_id", utils.checkAuthentication, post.unlike);

  router.post(config.get("routes.post.addComment") + "/:post_id", [ utils.checkAuthentication, [
    check("text", "Text is required").not().isEmpty() ]
  ], post.addComment);
  router.delete(config.get("routes.post.removeComment") + "/:post_id/:comment_id", [
    utils.checkAuthentication
  ], post.removeComment);

  router.delete(config.get("routes.post.destroy") + "/:post_id", utils.checkAuthentication, post.destroy);
  router.get(config.get("routes.post.list"), utils.checkAuthentication, post.list);
  
  app.use(router);
};

export default postsRoutes;
