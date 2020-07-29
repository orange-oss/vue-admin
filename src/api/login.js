import http from './http.js'

export default {
    login(params = {}) {
        return http.get('rank/getList', { params })
    }
}
