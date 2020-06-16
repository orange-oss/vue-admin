import http from "./http.js";

export default {
    login: (params) => http.get("rank/getList", params),
};
