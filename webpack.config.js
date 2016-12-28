'use strict'

const util = require('gulp-util')

module.exports = {
    output: {
        filename: 'app.js'
    },
    devtool: util.env.production ? false : 'source-map',
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint',
        },
      ],
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
    vue: {
      loaders: {
        js: 'babel!eslint'
      }
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
}