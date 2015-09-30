var gulp = require('gulp');
var del = require('del');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

var path = {
    app_jsx:  './src/jsx/app.jsx',
    app_less: './src/less/app.less',
    dest:     './public/',
    dest_js:  './public/js/',
    dest_css: './public/css/'
};

gulp.task('clean', function(done){
    del([path.dest], done)
});

gulp.task('clean-js', function(done){
    del([path.dest_js], done)
});

gulp.task('clean-css', function(done){
    del([path.dest_css], done)
});

gulp.task('clean-html', function(done){
    del([path.dest+'**/*.html'], done)
});

gulp.task('jshint', ['clean-js'], function(){
    return gulp.src(path.app_jsx)
        .pipe(plumber())
        .pipe(react({harmony: false, es6module: true}))
        .pipe(jshint({esnext: true}))
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
});

gulp.task('build-js', ['clean-js', 'jshint'], function(){
    return gulp.src(path.app_jsx)
        .pipe(plumber())
        .pipe(browserify({
            transform: ['babelify'],
            extensions: ['.jsx']
        }))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(rename('app.js'))
        .pipe(gulp.dest(path.dest_js))
});

gulp.task('build-css', ['clean-css'], function(){
    return gulp.src(path.app_less)
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
        .pipe(gulp.dest(path.dest_css))
});

gulp.task('build-html', ['clean-html'], function(){
    return gulp
        .src('./src/html/*.html')
        .pipe(gulp.dest(path.dest))
});

gulp.task('watch', ['build-js', 'build-css', 'build-html'], function(){
    gulp.watch('./src/jsx/*.jsx', ['build-js']);
    gulp.watch('./src/less/*.less', ['build-css']);
    gulp.watch('./src/html/*.html', ['build-html']);
});

gulp.task('default', ['build-js', 'build-css', 'build-html']);