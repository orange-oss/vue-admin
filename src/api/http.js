import axios from 'axios'
import store from '@/store/index.js'
import C from '@/common/constants.js'
// element-ui的message提示框组件，大家可根据自己的ui组件更改。
import { Message, Loading } from 'element-ui'

const instance = axios.create({
    baseURL: C.BASE_URL,
    timeout: C.TIMEOUT,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
// 定义loading
let loadingInstance = null
// 请求拦截器
// 请求配置
const reqconfig = config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
        loadingInstance = Loading.service({
            background: 'rgba(255, 255, 255, 0.5)'
        })
    }
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
}
// 请求错误
let reqError = error => {
    return Promise.error(error)
}
instance.interceptors.request.use(reqconfig, reqError)
// 响应拦截器
// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
// 否则的话抛出错误
const respCallback = response => {
    loadingInstance.close()
    if (response.status === 200) {
        switch (response.data.result.code) {
            case C.OK:
                break
            case 1009:
                Message({
                    showClose: true,
                    message: '请求过于频繁',
                    type: 'error'
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
        return Promise.resolve({
            status: response.data.result.code,
            msg: response.data.result.msg,
            data: response.data.data
        })
    }
    return Promise.resolve({
        status: response.status,
        msg: response.statusText,
        notice: '未知错误'
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
    loadingInstance.close()
    return Promise.resolve(errMsg)
}
instance.interceptors.response.use(respCallback, errorCallback)

export default instance
