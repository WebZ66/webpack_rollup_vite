const { Configuration } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name]_[hash]_bundle.js',
        clean: true,
        chunkFilename: 'js/[chunkhash]_chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    optimization: {
        minimize: true,
        minimizer: [
            //JS压缩的插件：TerserPlugin
            //CSS压缩的插件：CSSMinimizerPlugin
            new CssMinimizerPlugin({}),
        ],
    },
}
