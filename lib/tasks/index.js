'use strict';

var tastic = require('tastic').api
  , gulp = tastic.gulp;

var fs          = require('fs-extra')
  , consolidate = require('gulp-consolidate')
  , render      = require('../pipes/render')
  , indexed     = require('../pipes/indexed')
  , rename      = require('gulp-rename');

tastic.index= function (src, options, dest) {
  src = tastic.paths('theme', 'layout.jade');

  gulp.task('index', function () {
    fs.outputJson(tastic.paths('build', 'index.json'), indexed.get());

    return tastic.src(src)
      .pipe(tastic.lazypipe('data'))
      .pipe(render('jade', {
        _content: ''
      }))
      .pipe(rename('index.html'))
      .pipe(tastic.lazypipe('pretty'))
      .pipe(gulp.dest(tastic.paths('build', '')));
  });

  return tastic.queueTask('index')
    .watch(src, 'index', tastic.reload);
};
