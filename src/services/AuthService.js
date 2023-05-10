import axios from "axios";
import config from "../config";

const ENDPOINT = "/auth/login";
const KEY_TOKEN = "TOKEN";

const login = (user) => {
  return axios.post(`${config.BASE_URL}${ENDPOINT}`, user);
};

const saveToken = (token) => {
  localStorage.setItem(KEY_TOKEN, token);
};

const getToken = () => {
  return localStorage.getItem(KEY_TOKEN);
};

const logout = () => {
  localStorage.setItem(KEY_TOKEN, "");
};

const getUserFromToken = () => {
  let token = getToken();
  let user = JSON.parse(atob(token.split(".")[1]));
  return user;
};

export default {
  login,
  saveToken,
  getToken,
  logout,
  getUserFromToken,
};
