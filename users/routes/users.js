import DBG from "debug";
import config from "config";
import user from "../controllers/users";

const debug = DBG("platolio-users:debug-users_routes");
const error = DBG("platolio-users:error-users_routes");

const usersRoutes = server => {
  server.post(config.get("routes.user.register"), user.register);
  server.put(config.get("routes.user.update"), user.update);
  server.get(config.get("routes.user.findById"), user.findById);
  server.get(config.get("routes.user.find"), user.find);
  server.del(config.get("routes.user.destroy"), user.destroy);
  server.post(config.get("routes.user.checkpassword"), user.checkPassword);
  server.get(config.get("routes.user.list"), user.list);

  server.listen(process.env.PORT || config.get("port"), "localhost" ,() => {
    debug(`User authentication server ${server.name} running at ${server.url}`);
  });
}

export default usersRoutes;
