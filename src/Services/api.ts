import axios from "axios";

const api = axios.create({
  baseURL: "http://10.110.230.166:3333",
});

export { api };
