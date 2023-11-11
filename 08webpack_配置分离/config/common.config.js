const { Configuration } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { merge } = require('webpack-merge')
const devConfig = require('./dev.config')
const prodConfig = require('./prod.config.')

const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */

const getCommonConfig = function (isProduction) {
    return {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'js/[name]_[hash]_bundle.js',
            clean: true,
            chunkFilename: 'js/[chunkhash]_chunk.js',
        },
        resolve: {
            extensions: ['.js'],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name]_[contenthash].css',
                chunkFilename: 'css/[name]_chunk.css',
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
            }),
        ],
    }
}

module.exports = function (env) {
    console.log(env)
    const isProduction = env.production
    let mergeConfig = isProduction ? prodConfig : devConfig
    return merge(getCommonConfig(isProduction), mergeConfig)
}
