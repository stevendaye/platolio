import mongoose from "mongoose";
import DBG from "debug";
import config from "config";

const db = config.get("db.mongoURI");
const debug = DBG("platolio-users:connect-db");
const error = DBG("platolio-users:error-db");

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
    debug("MongoDB Database Connected!");
  } catch (err) {
    error(`Failed to connect to MongoDB -- ${err.message}`);
    process.exit(1);
  }
}

export default connectDB;
