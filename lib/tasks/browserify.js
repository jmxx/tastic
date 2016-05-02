'use strict';

import {api as tastic}  from '../';
import browserify       from 'browserify';
import vsource          from 'vinyl-source-stream';
import vbuffer          from 'vinyl-buffer';

const gulp = tastic.gulp;

tastic.browserify = (src, options, dest) => {
  src = tastic.paths.assets(src);

  gulp.task('browserify', () => {
    return browserify({
        entries: src,
        debug: true
      })
      .bundle()
      .on('error', function (err) {
        this.emit('end');
      })
      .pipe(vsource(dest || 'app.js'))
      .pipe(vbuffer())
      .pipe(tastic.plugins.sourcemaps.init())
      .pipe(tastic.plugins.uglify())
      .pipe(tastic.plugins.sourcemaps.write())
      .pipe(tastic.dest('js'));
  });

  return tastic.queueTask('browserify')
    .watch(src, 'browserify', tastic.reload);
};
