const { Configuration } = require('webpack')
const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
}
