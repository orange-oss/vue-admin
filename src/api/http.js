import axios from "axios";
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，
import store from "@/store/index.js";
import C_API from "@/common/constants.js";

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    (error) => {
        return Promise.error(error);
    }
);
// 响应拦截器
// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
// 否则的话抛出错误
const respCallback = (response) => {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
};
// 服务器状态码不是2开头的的情况
// 这里可以跟后台开发人员协商好统一的错误状态码
// 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
// 下面列举几个常见的操作，其他需求可自行扩展
const errorCallback = (error) => {
    if (error.response.status) {
        // switch (error.response.status) {
        //     // 401: 未登录
        //     // 未登录则跳转登录页面，并携带当前页面的路径
        //     // 在登录成功后返回当前页面，这一步需要在登录页操作。
        //     case 401:
        //         router.replace({
        //             path: "/login",
        //             query: {
        //                 redirect: router.currentRoute.fullPath,
        //             },
        //         });
        //         break;
        // }
        return Promise.reject(error.response);
    }
};
axios.interceptors.response.use(respCallback, errorCallback);

class Http {
    constructor(baseURL, timeout, config) {
        // 不同环境定义不同的baseurl
        axios.defaults.baseURL = baseURL;
        // 设置请求超时
        axios.defaults.timeout = timeout;
        // post请求头的设置
        axios.defaults.headers = config;
    }
    /**
     * get方法，对应get请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    get = (url, params) => {
        return new Promise((resolve, reject) => {
            axios
                .get(url, params)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    };

    /**
     * post方法，对应post请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    post = (url, params) => {
        return new Promise((resolve, reject) => {
            axios
                .post(url, QS.stringify(params))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    };
     /**
     * put方法，对应put请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    put = (url, params) => {
        return new Promise((resolve, reject) => {
            axios
                .put(url, QS.stringify(params))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    };
     /**
     * patch方法，对应patch请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    patch = (url, params) => {
        return new Promise((resolve, reject) => {
            axios
                .patch(url, QS.stringify(params))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    };
    /**
     * delete方法，对应delete请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    delete = (url, params) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(url, QS.stringify(params))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.data);
                });
        });
    };
}

const http = new Http(C_API.BASE_URL, C_API.TIMEOUT, {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
});
export default http;
