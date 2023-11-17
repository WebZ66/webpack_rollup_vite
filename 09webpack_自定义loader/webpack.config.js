const path = require('path')
const { Configuration } = require('webpack')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'development',
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
                use: [
                    './src/hy-loaders/hy-loader01.js',
                    './src/hy-loaders/hy-loader02.js',
                    {
                        loader: './src/hy-loaders/hy-loader04.js',
                        options: {
                            name: 123,
                        },
                    },
                ],
            },
        ],
    },
}
