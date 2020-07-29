import http from './http.js'

export default {
    list(params = {}) {
        return http.get('category/getCategoryEnd', { params })
    }
}
