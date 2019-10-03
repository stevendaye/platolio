import express from "express";
import config from "config";
import { check } from "express-validator";
import * as utils from "../middlewares/utilities";
import profile from "../controllers/profile";

const router = express.Router();

const profilesRoutes = app => {
  router.post(config.get("routes.user.profile.create"), [
    utils.checkAuthentication,
    [ check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty() ]
  ], profile.create);
  
  router.get(config.get("routes.user.profile.current"), utils.checkAuthentication, profile.findCurrent);
  router.get(config.get("routes.user.profile.find") + "/:userid", profile.find);
  
  router.put(config.get("routes.user.profile.updateExperience"), [utils.checkAuthentication, [
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "Starting date is required").not().isEmpty() ]
  ], profile.updateExperience);
  router.delete(config.get("routes.user.profile.removeExperience") + "/:exp_id", utils.checkAuthentication, profile.removeExperience);
  
  router.put(config.get("routes.user.profile.updateEducation"), [utils.checkAuthentication, [
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of Study is required").not().isEmpty(),
    check("from", "Starting data is required").not().isEmpty() ]
  ], profile.updateEducation);
  router.delete(config.get("routes.user.profile.removeEducation") + "/:edu_id", utils.checkAuthentication, profile.removeEducation);

  router.delete(config.get("routes.user.profile.destroy"), utils.checkAuthentication, profile.destroy);
  router.get(config.get("routes.user.profile.list"), profile.list);

  router.get(config.get("auth.githubAuth") + "/:username", profile.getGithubRepos);

  app.use(router);
};

export default profilesRoutes;
