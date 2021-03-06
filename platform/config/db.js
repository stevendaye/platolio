import mongoose from "mongoose";
import DBG from "debug";
import config from "config";

const db = config.get("db.mongoURI");
const debug = DBG("platolio:connect-db");
const error = DBG("platolio:error-db");

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
    debug("MongoDB Database Connected!");
  } catch (err) {
    error(`Failed to connect to MongoDB -- ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
