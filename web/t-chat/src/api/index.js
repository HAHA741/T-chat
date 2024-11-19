import { fetchData, fetchStream } from "./api";

export default {
  login() {
    return fetchData();
  },
  register(data) {
    return fetchData("/user/register", "POST", data);
  },
};
