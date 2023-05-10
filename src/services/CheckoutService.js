import axios from "axios";
import config from "../config";

const ENDPOINT = "/carts";

const create = (checkout) => {
  return axios.post(`${config.BASE_URL}${ENDPOINT}`, checkout);
};

export default { create };
