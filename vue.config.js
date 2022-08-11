const CompressionWebpackPlugin = require('compression-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    transpileDependencies: ['uview-ui'],
    publicPath: "./",
    configureWebpack:{
        plugins:[
            new CompressionWebpackPlugin(
                {
                    filename: "[path][base].gz",
                    algorithm: "gzip",
                    test: /\.js$/,
                    threshold: 10240,
                    minRatio: 0.8,
                    deleteOriginalAssets:false
                    // exclude: /node_modules/,
                }
            )
        ]
    },
    chainWebpack: config => {
        config.optimization.splitChunks({
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    minChunks: 4,
                    test: /node_modules/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {}
            }
        })
        config.plugin('ignore')
        .use(new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/))
    }
}