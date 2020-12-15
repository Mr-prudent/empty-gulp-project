// 定义依赖项和插件
const { src, dest, watch, series, parallel } = require('gulp');
const uglify = require('gulp-uglify'); //js压缩
const babel = require('gulp-babel');
const sass = require('gulp-sass'); // 编译scss
const minifycss = require('gulp-minify-css'); // 压缩css
const del = require('del'); //文件删除
const connect = require('gulp-connect'); // 自动刷新页面
const imagemin = require('gulp-imagemin'); // 图片处理

function myTaskJs() {
  return src(['src/js/*.js', '!src/js/temp.js'])
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    // .pipe(uglify())
    .pipe(dest('dist/js'));
}

function myTaskCss() {
  return src([
    'src/scss/style.scss',
    'src/css/*.css'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(dest('dist/css/'));
}

function myTaskImg() {
  return src([
    'src/img/*.{png,jpg,gif,ico}',
  ])
  .pipe(imagemin())
  .pipe(dest('dist/img'));
}

function html() {
  return src('src/*.html').pipe(dest('dist/'));
}

function clean() {
  return del(['dist/']);
}

function reload() {
  return src('./dist/**/*.html').pipe(connect.reload());
}

function funWatch() {
  watch('src/js/*.js', myTaskJs);
  watch('src/scss/*.scss', myTaskCss);
  watch('src/*.html', html);
  watch('./dist/**/*.*', reload);
}

function server() {
  connect.server({
    root: './dist',
    livereload: true,
    port: 6700,
  });
}

exports.default = parallel(series(clean, series(myTaskJs, myTaskCss, myTaskImg, html, funWatch)), server);