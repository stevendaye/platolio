/*## Create User Model ##*/
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  avatar: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("user", UserSchema);

async function create(name, email, password, avatar, timestamp) {
  const user = new User({name, email, password, avatar, timestamp });
  await user.save();
  return user;
}

async function update(name, email, password) {
  const user = await User.findOneAndUpdate({ email }, { name, email, password });
  return user;
}

async function findById(id) {
  const user = await User.findById({ _id: id }).select("-password");
  if (!user) {
    return {
      found: false,
      _id: id
    };
  } else {
    return {
      found: true,
      _id: id,
      sanitize: await sanitizeUser(user)
    };
  }
}

async function find(email) {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      found: false,
      email: email
    };
  } else {
    return {
      found: true,
      email: email,
      message: "User Already Exists",
      sanitize: await sanitizeUser(user)
    };
  }
}

async function checkPassword(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      check: false,
      email: email,
      message: "Invalid Credentials"
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (user.email === email && isMatch) {
    return {
      check: true,
      email: email,
      id: user._id
    };
  } else {
    return {
      check: false,
      email: email,
      message: "Password Incorrect!"
    };
  }
}

async function destroy(userid) {
  const user = await User.findOne({ _id: userid });
  if (!user) {
    throw new Error(`No user of id ${userid} found`);
  }
  await User.findOneAndRemove({ _id: userid });
}

async function list() {
  const users = await User.find({});
  return users.map(async user => await sanitizeUser(user));
}

async function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    timestamp: user.timestamp
  };
}

export { create, update, find, findById, checkPassword, destroy, list, sanitizeUser };
