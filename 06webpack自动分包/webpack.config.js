const { Configuration } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'development',
    name: 'main',
    entry: './src/index.js',
    devtool: false,
    output: {
        path: path.resolve(__dirname, './build'),
        //placeholder
        filename: 'js/[name]-bundle.js',
        clean: true,
        //单独针对分包的文件进行命名
        chunkFilename: 'js/[name]_chunk.js',
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
            {
                test: /\.css$/,
                //style-loader的作用：将转化后的css文件通过js创建style标签的方式插入到html文档中  (用于开发环境)
                //MiniCssExtractPlugin.loader：将css文件放到对应文件夹中，并在html中生成link标签导入css样式 (常用于生成环境)
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_css.css',
            chunkFilename: 'css/[name]_chunk.css', //对于动态导入的css文件进行命名，并放到对应文件夹中 import('./xx.css')
        }),
    ],
    devServer: {},
    //优化配置
    optimization: {
        splitChunks: {
            //默认只对异步import()导入的进行分包
            // chunks:'async'
            chunks: 'all',
            //自己对需要进行拆包的内容进行分组
            cacheGroups: {
                utils: {
                    test: /utils/,
                    filename: 'js/[id]_utils.js',
                },
            },
        },
    },
}
