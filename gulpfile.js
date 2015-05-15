// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var csso   = require('gulp-csso');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('styles', function() {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(rename('app.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  browserSync({
    notify: false,
    // https: true,
    server: ['./']
  });

  gulp.watch(['*.html'], reload);
  gulp.watch(['src/scss/**/**/**/**/*.scss'], ['styles']);
  gulp.watch(['css/**/**/**/**/*.css'], reload);
  gulp.watch(['js/**/*.js'], reload);
  gulp.watch(['img/**/*'], reload);
});

// Default Task
// gulp.task('default', ['lint', 'styles', 'scripts']);
// gulp.task('default', ['styles', 'scripts']);
gulp.task('default', ['styles']);
