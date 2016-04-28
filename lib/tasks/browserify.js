'use strict';

var tastic = require('tastic').api
  , gulp = tastic.gulp;

var browserify  = require('browserify')
  , vsource     = require('vinyl-source-stream')
  , vbuffer     = require('vinyl-buffer');

tastic.browserify = function (src, options, dest) {
  src = tastic.paths.assets(src);

  gulp.task('browserify', function () {
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
