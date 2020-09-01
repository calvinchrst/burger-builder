import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as config from "../../config/default.json";
import * as constants from "../../shared/constants";

const authSuccess = (token, userID) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userID: userID,
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

export const logout = () => {
  localStorage.removeItem(constants.STRING_TOKEN);
  localStorage.removeItem(constants.STRING_EXPIRATION_DATE);
  localStorage.removeItem(constants.STRING_USER_ID);
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem(constants.STRING_TOKEN, res.data.idToken);
        localStorage.setItem(constants.STRING_EXPIRATION_DATE, expirationDate);
        localStorage.setItem(constants.STRING_USER_ID, res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((error) => {
        console.error(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem(constants.STRING_TOKEN);
    if (token) {
      const expirationDate = new Date(
        localStorage.getItem(constants.STRING_EXPIRATION_DATE)
      );
      if (expirationDate > new Date()) {
        const userID = localStorage.getItem(constants.STRING_USER_ID);
        dispatch(authSuccess(token, userID));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
