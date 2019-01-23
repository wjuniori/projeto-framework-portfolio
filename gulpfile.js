var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var htmlMin = require('gulp-htmlmin');
var notify = require('gulp-notify');

var cssFiles = ['./public/assets/css/**/*.css'];
var cssFrameworkFiles = ['./vendor/css-framework/css/**/main.css'];
var htmlFile = ['./public/assets/*.html'];

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {
  
  // normalize.css
  gulp.src([
    './node_modules/normalize.css/normalize.css'
  ])
  .pipe(gulp.dest('./vendor/normalize.css'))

});

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

// Minify CSS Framework
gulp.task('css:framework:minify', function() {
  return gulp.src(cssFrameworkFiles)
    .pipe(cleanCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./vendor/css-framework/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:minify', 'css:framework:minify']);

// Default task
gulp.task('default', ['html', 'css', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

//Dev task
gulp.task('dev', ['html', 'css', 'vendor', 'browserSync'], function() {
  gulp.watch(cssFiles, ['css:minify']);
  gulp.watch(cssFrameworkFiles, ['css:framework:minify']);
  gulp.watch(htmlFile, ['html']);
});