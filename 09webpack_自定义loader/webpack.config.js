const path = require('path')
const { Configuration } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name]_bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [],
            },
            {
                test: /\.md$/,
                use: {
                    loader: './src/hy-loaders/hymd-loader.js',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
}
