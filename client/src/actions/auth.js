import axios from "axios";
//To display the alert of succes or error on UI
import { setAlert } from "./alert";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Load user
export const loadUser = () => async dispatch => {
  //checking if theres token, then place in global header via src/utils/setAuthToken.js
  //checking via localstorage and doing check on app.js as well
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  //making request via async await
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Registering user:
export const register = ({ name, email, password }) => async dispatch => {
  //sending data- intergrate into: /components/auth/Register.js
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    //to display the error
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
