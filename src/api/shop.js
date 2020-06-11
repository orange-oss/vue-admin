import http from "./http.js";

export default {
    list: (params) => http.get("category/getCategoryEnd", params),
};
