// ActionTypes.js
export const SET_LOGOUT = "SET_LOGOUT";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_BALANCE = "SET_BALANCE";
export const SET_PROFILE = "SET_PROFILE";
export const SET_BANNER = "SET_BANNER";

// Actions.js
import {
  SET_LOGOUT,
  SET_ACCOUNT,
  SET_BALANCE,
  SET_PROFILE,
  SET_BANNER,
} from "./ActionTypes";

export const setLogout = () => ({
  type: SET_LOGOUT,
});

export const setAccount = (account) => ({
  type: SET_ACCOUNT,
  payload: account,
});

export const setBalance = (balance) => ({
  type: SET_BALANCE,
  payload: balance,
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

export const setBanner = (banner) => ({
  type: SET_BANNER,
  payload: banner,
});
