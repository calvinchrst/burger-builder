import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as config from "../../config/default.json";

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url =
      (isSignup ? config.FIREBASE_SIGN_UP_URI : config.FIREBASE_SIGN_IN_URI) +
      config.FIREBASE_WEB_API_KEY;
    axios
      .post(url, authData)
      .then((res) => {
        dispatch(authSuccess(res.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(authFail(error));
      });
  };
};
