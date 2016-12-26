'use strict'

const util = require('gulp-util')

module.exports = {
    output: {
        filename: 'app.js'
    },
    devtool: util.env.production ? false : 'source-map',
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
}