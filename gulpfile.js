// var theme = "wiley-online-library";
// var theme = "wiley-analytical-science";
// var theme = "wiley-journals-app";
// var theme = "hub--analytical-science";
// var theme = "hub--nas-open";
// var theme = "clib";
// var theme = "cp1";
// var theme = "was";
var theme = "wji";
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  lazypipe = require('lazypipe'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  connect = require('gulp-connect');
var compileTheme = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(function() {
    return sass().on('error', sass.logError);
  })
  .pipe(postcss, [autoprefixer({
    browsers: [
      'Chrome >= 35',
      'Firefox >= 38',
      'Edge >= 12',
      'Explorer >= 10',
      'iOS >= 8',
      'Safari >= 8',
      'Android 2.3',
      'Android >= 4',
      'Opera >= 12'
    ]
  })])
  .pipe(sourcemaps.write)
  .pipe(rename, {
    basename: theme
  });
var minifyCss = lazypipe()
  .pipe(cleanCss)
  .pipe(rename, {
    suffix: '.min'
  });

gulp.task('compile-' + theme, function() {
  return gulp.src(['dist/' + theme + '/*.scss'])
    .pipe(compileTheme())
    .pipe(gulp.dest('dist/' + theme + '/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/' + theme + '/'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port: 5050
  });
});

gulp.task('watch', ['default', 'connect'], function() {
  gulp.watch(['./**/*.scss'], ['compile-' + theme]);
  gulp.watch(['./*.html'], ['html']);
});

gulp.task('default', ['compile-' + theme], function() {

});
