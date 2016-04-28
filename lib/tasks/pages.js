'use strict';

var tastic = require('tastic').api
  , gulp = tastic.gulp;

var render = require('../pipes/render')
  , indexed = require('../pipes/indexed')
  , rename = require('gulp-rename');

tastic.pages = function (src, options, dest) {
  src = tastic.paths.content('pages/*.jade');

  gulp.task('pages', function () {
    return tastic.src(src)
      .pipe(tastic.lazypipe('data'))
      .pipe(render('jade', {}, {
        //layout: tastic.paths('theme', 'layout.jade')
      }))
      .pipe(rename(function (path) {
        path.extname = '.html';

        return path;
      }))
      .pipe(tastic.lazypipe('pretty'))
      .pipe(tastic.dest('content/pages'))
      .pipe(indexed());
  });

  return tastic.queueTask('pages')
    .watch(src, 'pages', tastic.reload);
};
