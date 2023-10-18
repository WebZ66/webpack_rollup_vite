const { Configuration } = require('webpack')
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
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // plugins: [],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: 3,
                                    useBuiltIns: 'usage', //false: 打包后文件不使用polyfill，这时候不需要corejs
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
}
