import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userID: null,
  error: null,
  isLoading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { isLoading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userID: action.userID,
    isLoading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    token: null,
    userID: null,
    error: action.error,
    isLoading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userID: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
