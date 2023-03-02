const gulp = require('gulp');
// const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
// const uncss = require('gulp-uncss');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
// const postcss = require("gulp-postcss");

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

function styles(){
   return  gulp.src([
            './src/assets/styles/vendors/bootstrap.min.css',
            './src/assets/styles/vendors/box.min.css',
            './src/assets/styles/vendors/comments.min.css',
            './src/assets/styles/vendors/style.min.css',
            './src/assets/styles/vendors/sur.min.css',
            './src/assets/styles/vendors/survey.min.css',
            './src/assets/styles/styles.less'
        ])
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(less().on('error', function (err) {
            console.log(err);
          }))
        .pipe(concat('styles.css'))
        // .pipe(uncss({
        //     html: ['./src/index.html', './src /**/*.html']
        // }))
        .pipe(gcmq())
        // .pipe(autoprefixer({
        //     cascade: false
        // }))
        .pipe(gulpif(isProd, cleanCSS({
            level: 2    
        })))
        .pipe(gulpif(isDev,sourcemaps.write()))
        .pipe(gulp.dest('./build/assets/styles'))
        .pipe(gulpif(isSync, browserSync.stream()));
}
function img(){
    return  gulp.src('./src/assets/images/**/*')
        .pipe(gulp.dest('./build/assets/images'))
 }
function scripts(){
    return  gulp.src([
        './src/assets/scripts/vendors/jquery.min.js',
        './src/assets/scripts/vendors/*.js',
        './src/assets/scripts/custom.js'
    ])
    .pipe(concat('custom.js'))
    .pipe(gulp.dest('./build/assets/scripts'))
}
 function html(){
    return  gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
 }
function clear(){
    return del('./build/*');
}
 
function watch(){
    if(isSync){
        browserSync.init({
            server: {
                baseDir: "./build/"
            }
        });
    }
    gulp.watch('./src/**/*', gulp.parallel(styles, img, html, scripts));
}

let build = gulp.series(clear,
    gulp.parallel(styles, img, html, scripts)
);

    

gulp.task('watch', gulp.series(build, watch));  
gulp.task('build', build);
