'use strict';

var tastic = require('tastic').api
  , gulp = tastic.gulp;

var stylus = require('../utils').relativerequire('gulp-stylus');

tastic.stylus = function (src, options, dest) {
  src = tastic.paths.assets(src);

  gulp.task('stylus', function () {
    return tastic.src(src)
      .pipe(tastic.plugins.sourcemaps.init())
      .pipe(stylus())
      .pipe(tastic.plugins.sourcemaps.write())
      .pipe(tastic.dest('css'))
      .pipe(tastic.stream());
  });

  return tastic.queueTask('stylus')
    .watch(src, 'stylus');
};
