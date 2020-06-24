import http from './http.js'

export default {
    download: (url, params) => http.get(url, params, { responseType: 'blob' })
}
