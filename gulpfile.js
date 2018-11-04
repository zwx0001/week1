/*
 * @Author: mikey.zhang 
 * @Date: 2018-11-04 14:59:59 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2018-11-04 15:06:07
 */

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var url = require('url');
var webserver = require('gulp-webserver');
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
                        res.end(JSON.stringify({ code: 0, data: data.data }));
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