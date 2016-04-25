'use strict';

var api = require('./api');

function init(next) {
  require('./tasks/index');
  require('./tasks/server');
  require('./tasks/browserify');
  require('./tasks/posts');
  require('./tasks/pages');
  require('./tasks/styles');

  next(api);

  api.gulp.task('default',  api.gulp.series.apply(null, api.tasks));
}

module.exports = init;

module.exports.api = api;
