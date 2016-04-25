'use strict';

var gulp = require('gulp')
  , ghpages = require('gulp-gh-pages');

var tastic = require('tastic');

tastic(function (api) {
  api
    // .config({
    //
    // })
    // .theme('default')
    .stylus('stylus/main.styl')
    .posts()
    .pages()
    .index()
    .browserify('main.js')
    .serve();

  // gulp.task('deploy', function () {
  //   return gulp.src('./build/**/*')
  //       .pipe(ghpages({}));
  // });
});
