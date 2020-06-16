const path = require('path')
const target = 'http://yuenov.com:15555'

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: {
        devServer: {
            // 配置跨域
            proxy: {
                '/app/open/api': {
                    target,
                    changeOrigin: true //是否跨域
                }
            }
        }
    }
}
