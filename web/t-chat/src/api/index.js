import { fetchData, fetchStream } from "./api";

export default {
  login(data) {
    return fetchData("/api/user/login","post",data);
  },
  register(data) {
    return fetchData("/user/register", "post", data);
  },
};
