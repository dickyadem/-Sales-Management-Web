import axios from "axios";
import config from "../config";

const ENDPOINT = "/products";

const list = () => {
  return axios.get(`${config.BASE_URL}${ENDPOINT}`);
};

export default { list };
