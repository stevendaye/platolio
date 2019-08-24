/*## Create User Profile Model ##*/
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  company: String,
  website: String,
  location: String,
  bio: String,
  status: {
    type: String,
    required: true
  },
  githubusername: String,
  skills: {
    type: [String],
    required: true
  },
  experience: [{
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: String,
    from: {
      type: Date,
      required: true
    },
    to: Date,
    current: {
      type: Boolean,
      default: false
    },
    description: String
  }],
  education: [{
    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldofstudy: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: Date,
    current: {
      type: Boolean,
      default: false
    },
    description: String
  }],
  social: {
    twitter: String,
    linkedin: String,
    facebook: String,
    instagram: String,
    youtube: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model("profile", ProfileSchema);

async function create(userid, company, website, location, bio, status, githubusername,
  skills, twitter, linkedin, facebook, instagram, youtube, timestamp) {
  const profile = new Profile({userid, company, website, location, bio, status, githubusername,
    skills, twitter, linkedin, facebook, instagram, youtube, timestamp});
    profile.social.twitter = twitter;
    profile.social.linkedin = linkedin;
    profile.social.facebook = facebook;
    profile.social.instagram = instagram;
    profile.social.youtube = youtube;

  await profile.save();
  return profile;
}

async function update(userid, company, website, location, bio, status, githubusername,
  skills, twitter, linkedin, facebook, instagram, youtube, timestamp) {

  const profile = await Profile.findOneAndUpdate({ userid }, { userid, company, website, location, bio, status,
    githubusername, skills, twitter, linkedin, facebook, instagram, youtube, timestamp }, { new: true });
    profile.social.twitter = twitter;
    profile.social.linkedin = linkedin;
    profile.social.facebook = facebook;
    profile.social.instagram = instagram;
    profile.social.youtube = youtube;

  await profile.save();
  return profile;
}

async function find(userid) {
  const profile = await Profile.findOne({ userid }).populate("userid", ["name", "avatar", "timestamp"]);
  if (profile) {
    return {
      found: true,
      userid: userid,
      current: profile
    }
  } else {
    return {
      found: false,
      userid: userid,
      message: "There is no profile for this user"
    }
  }
}

async function updateExperience(userid, newExperience) {
  const profile = await Profile.findOne({ userid });
  profile.experience.unshift(newExperience);
  await profile.save();
  return profile;
}

async function removeExperience(userid, expid) {
  const profile = await Profile.findOne({ userid });
  const removedIndex = profile.experience.map(item => item.id).indexOf(expid);
  profile.experience.splice(removedIndex, 1);
  await profile.save();
  return profile;
}

async function updateEducation(userid, newEducation) {
  const profile = await Profile.findOne({ userid });
  profile.education.unshift(newEducation);
  await profile.save();
  return profile;
}

async function removeEducation(userid, eduid) {
  const profile = await Profile.findOne({ userid });
  const removedIndex = profile.education.map(item => item.id).indexOf(eduid);
  profile.education.splice(removedIndex, 1);
  await profile.save();
  return profile;
}

async function destroy(userid) {
  const profile = await Profile.findOne({ userid });
  if (!profile) {
    throw new Error(`No profile found for user ${userid}`);
  }
  await Profile.findOneAndRemove({ userid });
}

async function list() {
  const profiles = await Profile.find({}).populate("userid", ["name", "avatar", "timestamp"]);
  return profiles;
}

export { create, update, find, updateExperience, updateEducation, removeExperience,
  removeEducation, destroy, list };
