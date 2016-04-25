'use strict';

var tastic = require('tastic').api
  , gulp = tastic.gulp;

var render = require('../pipes/render')
  , indexed = require('../pipes/indexed');

tastic.posts = function (src, options, dest) {
  src = tastic.paths('content', 'posts/*.md');

  gulp.task('posts', function () {
    return tastic.src(src)
      .pipe(tastic.lazypipe('markdown'))
      .pipe(render('html', {}, {
        // layout: tastic.paths('theme', 'layout.jade')
      }))
      .pipe(indexed())
      .pipe(tastic.lazypipe('pretty'))
      .pipe(gulp.dest(tastic.paths('build', 'posts')));
  });

  return tastic.queueTask('posts')
    .watch(src, 'posts', tastic.reload);
};
