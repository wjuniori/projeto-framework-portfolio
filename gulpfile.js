var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var imageMin = require('gulp-imagemin');
var concat = require('gulp-concat');
var htmlMin = require('gulp-htmlmin');
var notify = require('gulp-notify');

var cssFiles = ['./public/assets/css/**/*.css'];
var imgFiles = [
  './public/assets/img/**/*.jpg',
  './public/assets/img/**/*.jpeg',
  './public/assets/img/**/*.gif',
  './public/assets/img/**/*.png',
  './public/assets/img/**/*.svg',
  '!./public/assets/img/originals/**/*'
];
var htmlFile = ['./public/assets/*.html'];

// Minify HTML
gulp.task('html:minify', function() {
  return gulp.src(htmlFile)
  .pipe(htmlMin({
    collapseWhitespace:true
  }))
  .on("error", notify.onError("Error: <%= error.message %>"))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream());
});

// HTML
gulp.task('html', ['html:minify']);

// Minify CSS
gulp.task('css:minify', function() {
  return gulp.src(cssFiles)
    .pipe(cleanCSS())
    .pipe(concat('framework-portfolio.min.css'))
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:minify']);

// Minify Image
gulp.task('img', function() {
  return gulp.src(imgFiles)
    .pipe(imageMin())
    .pipe(gulp.dest('./public/dist/img/'));
});

// Default task
gulp.task('default', ['html', 'css', 'img']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

//Dev task
gulp.task('dev', ['html', 'css', 'img', 'browserSync'], function() {
  gulp.watch(cssFiles, ['css']);
  gulp.watch(imgFiles, ['img']);
  gulp.watch(htmlFile, ['html']);
});