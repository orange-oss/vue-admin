const BASE_URL = {
    DEBUG: "http://localhost:8080",
    DEV: "http://localhost:8080",
    TEST: "http://test.yuenov.com:15555",
    PROD: "http://www.yuenov.com:15555",
};
const PATH_HEAD = "/app/open/api";

const C_API = {
    BASE_URL: `${BASE_URL[process.env.NODE_ENV]}${PATH_HEAD}`,
    TIMEOUT: 15000,
};

export default C_API;
