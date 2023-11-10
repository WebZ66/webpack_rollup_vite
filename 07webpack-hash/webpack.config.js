const { Configuration } = require('webpack')
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
        chunkFilename: '[chunkhash]_chunk.js',
    },
}
