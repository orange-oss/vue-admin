import axios from 'axios'
import store from '@/store/index.js'
import C from '@/common/constants.js'
// element-ui的message提示框组件，大家可根据自己的ui组件更改。
import { Message } from 'element-ui'

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.error(error)
    }
)
// 响应拦截器
// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
// 否则的话抛出错误
const respCallback = response => {
    if (response.status === 200) {
        return Promise.resolve(response.data)
    }
    return Promise.resolve({
        status: response.status,
        msg: response.statusText
    })
}
// 服务器状态码不是2开头的的情况
// 这里可以跟后台开发人员协商好统一的错误状态码
// 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
// 下面列举几个常见的操作，其他需求可自行扩展
const errorCallback = error => {
    const errMsg = {
        status: C.ERR_UNKNOWN,
        msg: error.message,
        notice: '未知错误'
    }
    if (error.response.status) {
        let tempErr = {
            status: error.response.status,
            msg: error.response.statusText
        }
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case C.ERR_HTTP_SESSION_TIMEOUT:
                this.$router.replace({
                    path: '/login',
                    query: {
                        redirect: this.$router.currentRoute.fullPath
                    }
                })
                Object.assign(tempErr, {
                    notice: '登录超时'
                })
                break
            // 404请求不存在
            case C.ERR_HTTP_NOT_FOUND:
                Message({
                    showClose: true,
                    message: '资源请求不存在',
                    type: 'error'
                })
                Object.assign(tempErr, {
                    notice: '资源请求不存在'
                })
                break
            // 500请求不存在
            case C.ERR_HTTP_SERVER_ERROR:
                Message({
                    showClose: true,
                    message: '服务异常',
                    type: 'error'
                })
                Object.assign(tempErr, {
                    notice: '服务异常'
                })
                break
            // 其他错误，直接抛出错误提示
            default:
                Message({
                    showClose: true,
                    message: '未知错误',
                    type: 'error'
                })
        }
        Object.assign(errMsg, tempErr)
    } else {
        Message({
            showClose: true,
            message: error.message,
            type: 'error'
        })
    }
    return Promise.resolve(errMsg)
}
axios.interceptors.response.use(respCallback, errorCallback)

class Http {
    constructor(baseURL, timeout, config) {
        // 不同环境定义不同的baseurl
        axios.defaults.baseURL = baseURL
        // 设置请求超时
        axios.defaults.timeout = timeout
        // post请求头的设置
        axios.defaults.headers = config
    }

    processResp = resp => {
        return new Promise(resolve => {
            // 根据接口字段进行更改resp中数据
            if (resp.result.code === C.OK) {
                return resolve(resp.data)
            }
            if (resp.result.code === 1009) {
                Message({
                    showClose: true,
                    message: '请求过于频繁',
                    type: 'error'
                })
            }
        })
    }
    /**
     * get方法，对应get请求
     * @param {String} url [请求的url地址] 必传
     * @param {Object} params [请求时携带的参数]
     * 若options中有值，则params必传
     */

    get = (url, params, options) => {
        return axios.get(url, { params, ...options }).then()
    }
    /**
     * post方法，对应post请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {String} responseType [表示服务器响应的数据类型 默认是json]
     */
    post = (url, params) => {
        return axios.post(url, params).then(this.processResp)
    }
    /*
     * put方法，对应put请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {String} responseType [表示服务器响应的数据类型 默认是json]
     */
    put = (url, params, responseType) => {
        return axios.put(url, params, responseType).then(this.processResp)
    }
    /**
     * patch方法，对应patch请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {String} responseType [表示服务器响应的数据类型 默认是json]
     */
    patch = (url, params, responseType) => {
        return axios.patch(url, params, responseType).then(this.processResp)
    }
    /**
     * delete方法，对应delete请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {String} responseType [表示服务器响应的数据类型 默认是json]
     */
    delete = (url, params, responseType) => {
        return axios.delete(url, params, responseType).then(this.processResp)
    }
}

const http = new Http(C.BASE_URL, C.TIMEOUT, {
    'Content-Type': 'application/json;charset=UTF-8'
})

export default http
