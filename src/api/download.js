import http from './http.js'

export default {
    download(url) {
        return http.get(url, { responseType: 'blob', hideloading: true })
    }
}
