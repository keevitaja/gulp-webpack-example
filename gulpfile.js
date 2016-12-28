'use strict'

const fs = require('fs-extra')
const gulp = require('gulp')
const minify = require('gulp-clean-css')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const rev = require('gulp-rev')
const run = require('run-sequence')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const util = require('gulp-util')
const webpack = require('webpack-stream')

let assetPath = './resources/assets/'
let buildPath = './public/build/'
let publicPath = './public/'

gulp.task('js', (done)=> {
    return gulp.src(assetPath + 'js/app.js')
        .pipe(plumber())
        .pipe(webpack(require('./webpack.config.js')))
        .on('error', (err)=> {
            err.message = 'Scripts failed'
            notify().write(err)
        })
        .pipe(util.env.production ? uglify() : util.noop())
        .pipe(gulp.dest(publicPath + 'js'))
        .pipe(util.env.production ? util.noop() : notify({
            message: 'Compiled scripts',
            onLast: true
        }))
})

gulp.task('sass', (done)=> {
    return gulp.src(assetPath + 'sass/app.scss')
        .pipe(util.env.production ? util.noop() : sourcemaps.init())
        .pipe(sass().on('error', (err)=> {
            err.message = 'Styles failed'
            notify().write(err)
            done()
        }))
        .pipe(util.env.production ? minify() : util.noop())
        .pipe(util.env.production ? util.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest(publicPath + 'css'))
        .pipe(util.env.production ? util.noop() : notify({
            message: 'Compiled styles',
            onLast: true
        }))
})

gulp.task('version', ()=> {
    return gulp.src([publicPath + 'js/app.js', publicPath + 'css/app.css'])
        .pipe(rev())
        .pipe(gulp.dest(buildPath))
        .pipe(rev.manifest({ merge: true }))
        .pipe(gulp.dest(buildPath))
        .pipe(util.env.production ? util.noop() : notify('Versioned assets'))
})

gulp.task('monitor', (done)=> {
    gulp.watch([
        assetPath + 'js/**/*.vue',
        assetPath + 'js/**/*.js',
        assetPath + 'sass/**/*.scss'
    ], ['default'])
})

gulp.task('watch', (done)=> {
    run('default', 'monitor', ()=> {
        done()
    })
})

gulp.task('default', (done)=> {
    fs.removeSync(buildPath)

    run('js', 'sass', 'version', ()=> {
        done()
    })
})