import mongoose from "mongoose";
import DBG from "debug";
import config from "config";

const db = config.get("mongoURI");
const debug = DBG("platolio:connect-db");
const error = DBG("platolio:error-db");

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    debug("MongoDB Database Connected!");
  } catch (err) {
    error(err.message);
    process.exit(1);
  }
};

export default connectDB;
