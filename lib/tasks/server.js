'use strict';

import {api as tastic} from '../';
import browserSync from 'browser-sync';

const gulp = tastic.gulp;

tastic.serve = (baseDir) => {
  gulp.task('serve', (done) => {
    browserSync({
      server: {
        baseDir: baseDir || 'build'
      }
    }, done);
  });

  return tastic.queueTask('serve');
}
