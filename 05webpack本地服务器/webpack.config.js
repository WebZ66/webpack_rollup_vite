const { Configuration } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: false,
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react']],
                    },
                },
            },
            {
                test: /\.ts$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-typescript',
                                {
                                    //配置polyfill
                                    corejs: 3,
                                    useBuiltIns: 'usage',
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    devServer: {},
}
