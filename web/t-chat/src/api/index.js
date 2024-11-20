import { fetchData, fetchStream, postEventStream } from "./api";

export default {
  login(data) {
    return fetchData("/user/login", "post", data);
  },
  register(data) {
    return fetchData("/user/register", "POST", data);
  },
  getUserInfo() {
    return fetchData("/user/userInfo", "get");
  },
  communication(data, fn) {
    return postEventStream("/api/chat/communication", data, fn);
    // return fetchData("/chat/communication", "post", data);
  },
};
