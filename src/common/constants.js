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

const C_RESP = {
    ERR_HTTP_BAD_REQUEST: 400,
    ERR_HTTP_SESSION_TIMEOUT: 401,
    ERR_HTTP_FORBIDDEN: 403,
    ERR_HTTP_NOT_FOUND: 404,
    ERR_HTTP_NOT_ALLOWED: 405,
    ERR_HTTP_SERVER_ERROR: 500,
    ERR_HTTP_BAD_GATEWAY: 502,
    ERR_UNKNOWN: -9999,
    OK: 0,
};

export default {
    ...C_API,
    ...C_RESP,
};
