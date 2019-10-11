/* Create User API */
import axios from "axios";

const AUTH_URL = "/auth";
const BASE_URL = "/users/register";

const registerUser = async (name, email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  return await axios.post(BASE_URL, body, config);
};

const getUser = async () => {
  return await axios.get(AUTH_URL);
}

export default registerUser;
export { getUser };
