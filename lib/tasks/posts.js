'use strict';

import { api as tastic }    from '../';
import { render, indexed }  from '../pipes';

const gulp = tastic.gulp;

tastic.posts = (src, options = {}, dest = '') => {
  src = tastic.paths.content('posts/*.md');

  gulp.task('posts', () => {
    return tastic.src(src)
      .pipe(tastic.lazypipe('markdown'))
      .pipe(render('html', {}, {
        // layout: tastic.paths('theme', 'layout.jade')
      }))
      .pipe(tastic.lazypipe('pretty'))
      .pipe(tastic.dest('content/posts'))
      .pipe(indexed());
  });

  return tastic.queueTask('posts')
    .watch(src, 'posts', tastic.reload);
};
