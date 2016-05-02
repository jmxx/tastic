'use strict';

import {api as tastic}    from '../';
import rename             from 'gulp-rename';
import {render, indexed}  from '../pipes';

const gulp = tastic.gulp;

tastic.pages = (src, options = {}, dest = '') => {
  src = tastic.paths.content('pages/*.jade');

  gulp.task('pages', () => {
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
