'use strict';

var tastic = require('tastic').api;

var browserSync = require('browser-sync')
  , gulp = tastic.gulp;

tastic.serve = function (baseDir) {
  gulp.task('serve', function (done) {
    browserSync({
      server: {
        baseDir: baseDir || 'build'
      }
    }, done);
  });

  return tastic.queueTask('serve');
}
