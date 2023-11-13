const { Configuration } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'development',
    devServer: {
        static: ['content'],
    },
    plugins: [],
    optimization: {
        usedExports: true,
    },
}
