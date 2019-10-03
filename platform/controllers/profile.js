import "dotenv/config";
import { validationResult } from "express-validator";
import request from "request";
import config from "config";
import DBG from "debug";
import util from "util";
import * as ProfileModel from "../models/users/profile-queries";
import * as UserModel from "../models/users/users-queries";
import * as PostModel from "../models/posts/posts-mongodb"

const debug = DBG("platolio:debug-profiles_controllers");
const error = DBG("platolio:error-profiles_controllers");

export default {
  async create(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      twitter,
      linkedin,
      facebook,
      instagram,
      youtube 
    } = req.body;

    const profileFields = {};
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) profileFields.skills = skills.split(",").map(skill => skill.trim());

    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.youtube = youtube;
    const timestamp = new Date();

    try {
      let profile = await ProfileModel.find(req.user.id);
      if (profile.found) {
        profile = await ProfileModel.update(req.user.id, profileFields.company, profileFields.website,
          profileFields.location, profileFields.bio, profileFields.status, profileFields.githubusername,
          profileFields.skills, profileFields.social.twitter, profileFields.social.linkedin,
          profileFields.social.facebook, profileFields.social.instagram, profileFields.social.youtube, timestamp);
        return res.json(profile);
      } else {
        profile = await ProfileModel.create(req.user.id, profileFields.company, profileFields.website,
          profileFields.location, profileFields.bio, profileFields.status, profileFields.githubusername,
          profileFields.skills, profileFields.social.twitter, profileFields.social.linkedin,
          profileFields.social.facebook, profileFields.social.instagram, profileFields.social.youtube, timestamp);
        return res.json(profile);
      }
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when creating profile");
    }
  },

  async findCurrent(req, res, next) {
    try {
      const profile = await ProfileModel.findCurrent(req.user.id);
      if (profile.found) {
        debug(`Profile found -- ${util.inspect(profile)}`);
        return res.json(profile.current);
      } else {
        return res.status(404).json({ message: profile.message });
      }
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when reading current profile");
    }
  },

  async find(req, res, next) {
    try {
      const profile = await ProfileModel.find(req.params.userid);
      if (profile.found) {
        debug(`Profile found -- ${util.inspect(profile)}`);
        return res.json(profile.current);
      } else {
        return res.status(404).json({ message: profile.message });
      }
    } catch (err) {
      error(err.stack);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(500).send("Server Error! Something got wrong when reading profile");
    }
  },

  // @access Private
  // @route PUT /users/profile/update/experience
  async updateExperience(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await ProfileModel.updateExperience(req.user.id, newExperience);
      debug(`Updated Profile Experience -- ${profile}`);
      res.json(profile);
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when updating new experience");
    }
  },

  // @access Private
  // @route DELETE /users/profile/remove/experience/:exp_id
  async removeExperience(req, res, next) {
    try {
      const profile = await ProfileModel.removeExperience(req.user.id, req.params.exp_id);
      debug(`Removed Profile Experience -- ${profile}`);
      res.json(profile);
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when removing experience");
    }
  },

  // @access Private
  // @route PUT /users/profile/update/education
  async updateEducation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }
    try {
      const profile = await ProfileModel.updateEducation(req.user.id, newEducation);
      debug(`Updated Profile Education -- ${profile}`);
      res.json(profile);
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when updating new education");
    }
  },

  // @access Private
  // @route DELETE /users/profile/remove/education/:edu_id
  async removeEducation(req, res, next) {
    try {
      const profile = await ProfileModel.removeEducation(req.user.id, req.params.edu_id);
      debug(`Removed Profile Education -- ${profile}`);
      res.json(profile);
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when removing education");
    }
  },

  // @access Private
  // @route DELETE /users/profile/destroy
  // @description "Destroy User account, profile and posts"
  async destroy(req, res, next) {
    try {
      const post = await PostModel.findByUserId(req.user.id);

      await UserModel.destroy(req.user.id);
      await ProfileModel.destroy(req.user.id);
      if (post) {
        await PostModel.destroy(req.user.id);
      }
      res.json({ message: "We are sorry that you are leaving us. Account Successfully Deleted."}); 
      debug(`User ${req.user.id} deleted!`);
    } catch (err) {
      error(err.stack);
      res.status(500).send(`Server Error! Something got wrong when deleted user account`);
    }
  },

  async list(req, res, next) {
    try {
      const profiles = await ProfileModel.list();
      debug(`Find Profiles: ${util.inspect(profiles)}`);
      res.json(profiles);
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when reading all profiles");
    }
  },

  // @access Public
  // @route GET /users/auth/github/:username
  async getGithubRepos(req, res, next) {
    try {
      const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=7&sort=created:asc
        &client_id=${config.get("github.clientId") || process.env.GITHUB_CLIENT_ID}&
        client_secret=${config.get("github.clientSecret") || process.env.GITHUB_CLIENT_SECRET}`,
        method: "GET",
        headers: { "user-agent": "node.js" }
      };
  
      request(options, (err, response, body) => {
        if (err) error(err);
        if (response.statusCode !== 200) {
          return res.status(404).json({ message: `No Github profile found for username ${req.params.username}`});
        }
        res.json(JSON.parse(body));
      });
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when getting github repos");
    }
  }
}