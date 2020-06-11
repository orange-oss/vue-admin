import http from "./http.js";

export default {
    list: (params) => http.get("rank/getList",params),
};
