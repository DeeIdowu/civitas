import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

//via thunk
export const setAlert = (msg, alertType) => dispatch => {
  //generate the id:
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
