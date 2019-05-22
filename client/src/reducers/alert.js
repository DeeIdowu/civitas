//importing alerts:
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

//function taking state regarding alerts, thus action being dispatched as result
const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  //evaluation of type of action
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
