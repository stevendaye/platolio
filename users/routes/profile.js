import DBG from "debug";
import config from "config";
import profile from "../controllers/profile";

const debug = DBG("platolio-users:debug-profiles_routes");
const error = DBG("platolio-users:error-profiles_routes");

const profilesRoutes = server => {
  server.post(config.get("routes.user.profile.create"), profile.create);
  server.get(config.get("routes.user.profile.current"), profile.find);
  server.get(config.get("routes.user.profile.find"), profile.find);
  server.put(config.get("routes.user.profile.update"), profile.update);
  server.put(config.get("routes.user.profile.updateExperience"), profile.updateExperience);
  server.del(config.get("routes.user.profile.removeExperience"), profile.removeExperience);
  server.put(config.get("routes.user.profile.updateEducation"), profile.updateEducation);
  server.del(config.get("routes.user.profile.removeEducation"), profile.removeEducation);
  server.del(config.get("routes.user.profile.destroy"), profile.destroy);
  server.get(config.get("routes.user.profile.list"), profile.list);
}

export default profilesRoutes;
