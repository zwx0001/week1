/*
 * @Author: mikey.zhang 
 * @Date: 2018-11-04 14:59:59 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2018-11-04 20:27:03
 */

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var url = require('url');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var data = require('./src/data/data.json');

//搭建服务器
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8888,
            livereload: true,
            directoryListing: true,
            open: true,
            fallback: 'index.html',
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return res.end();
                }
                var pathname = url.parse(req.url).pathname;
                if (/^\/api/.test(req.url)) {
                    if (pathname === '/api/getData') {
                        var idx = url.parse(req.url, true).query.idx;
                        var start = idx * 4;
                        var end = start + 4;
                        var datas = data.data.slice(start, end);
                        res.end(JSON.stringify({ code: 0, data: datas }));
                        res.end('666')
                    } else {
                        res.end('请求失败!');
                    }
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
})

//编译scss
gulp.task('sass', function() {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
})

//监听sass
gulp.task('watch', function() {
    return gulp.watch('./src/scss/style.scss', gulp.series('sass'))
})

//es6转es5并压缩js
gulp.task('minjs', function() {
    return gulp.src('./src/js/index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/minjs'))
})

//压缩css
gulp.task('minify-css', function() {
    return gulp.src('./src/css/style.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/css/mincss'))
})

gulp.task('last', gulp.series('sass', 'minjs', 'minify-css', 'server', 'watch'));