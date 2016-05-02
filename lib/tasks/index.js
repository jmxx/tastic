'use strict';

import fs                   from 'fs-extra';
import rename               from 'gulp-rename';
import { api as tastic }    from '../';
import { render, indexed }  from '../pipes';

const gulp = tastic.gulp;

tastic.index= function (src, options = {}, dest = '') {
  src = tastic.paths.theme('layout.jade');

  gulp.task('index', () => {
    fs.outputJson(tastic.paths.build('index.json'), indexed.get());

    return tastic.src(src)
      .pipe(tastic.lazypipe('data'))
      .pipe(render('jade', {
        _content: ''
      }))
      .pipe(rename('index.html'))
      .pipe(tastic.lazypipe('pretty'))
      .pipe(tastic.dest());
  });

  return tastic.queueTask('index')
    .watch(src, 'index', tastic.reload);
};
