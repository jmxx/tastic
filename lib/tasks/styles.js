'use strict';

import { api as tastic }    from '../';
import { relativerequire }  from '../utils';

const gulp = tastic.gulp;
const stylus = relativerequire('gulp-stylus');

tastic.stylus = (src, options, dest) => {
  src = tastic.paths.assets(src);

  gulp.task('stylus', () => {
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
