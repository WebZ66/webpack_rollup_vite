const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { Configuration } = require('webpack')
/**
 * @type {Configuration} //配置智能提示
 */

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'js/[hash]_[name].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    devServer: {
        static: ['public'],
        port: 9000,
        proxy: {
            '/cim-highrender': {
                target: 'http://10.169.3.16:8088',
            },
        },
    },
}
