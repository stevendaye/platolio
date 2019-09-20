/*## Set up Middleware Utilities ##*/
import jwt from "jsonwebtoken";
import util from "util";
import config from "config";
import DBG from "debug";

const debug = DBG("platolio:platform-utilities");
const error = DBG("platolio:error-utilities");

// JSON Web Token Authentication Middleware
const checkAuthentication = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No Token. Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("auth.jwtToken"));
    req.user = decoded.user;
    debug(`req.user is now available: ${util.inspect(req.user)}`);
    next();
  } catch (err) {
    error(`Token ${token} is not valid`);
    res.status(401).json({ message: "Token Not valid" });
  }
}

export { checkAuthentication };
