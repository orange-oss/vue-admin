import { get } from "./http.js";
export const list = (p) => get("rank/getList", p);
