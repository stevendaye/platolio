/* Getting the token from the Local Storage and to set it in the header */
import axios from "axios";

const setAuthTokenHeader = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
}

export default setAuthTokenHeader;
