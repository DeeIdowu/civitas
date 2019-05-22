//function taking token then add to headers
import axios from "axios";

const setAuthToken = token => {
  //checking token from local storage
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    //if not token
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
