'use strict';

import api from './api';

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

// init.api = api;

export default init;

export { api };