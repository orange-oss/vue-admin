const path = require('path')
const target = 'http://yuenov.com:15555'

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    // 打包路径
    outputDir: 'dist',
    assetsDir: './assets',
    indexPath: 'index.html',
    filenameHashing: true,
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
        config.when(process.env.NODE_ENV !== 'DEV', config => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end()
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
            config.optimization.runtimeChunk('single')
        })
    },
    configureWebpack: {
        devServer: {
            // 配置跨域
            proxy: {
                '/app/open/api': {
                    target,
                    changeOrigin: false //是否跨域
                }
            }
        },
        // 打包后的文件js加hash后缀
        output: {
            filename: 'js/[name]-[hash].js',
            chunkFilename: `js/[name]-[chunkhash].js`
        }
    }
}
