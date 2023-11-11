const { Configuration } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash].css',
            chunkFilename: 'css/[name]_chunk.css',
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
