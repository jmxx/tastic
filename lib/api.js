'use strict';

import browserSync  from 'browser-sync';
import sourcemaps   from 'gulp-sourcemaps';
import uglify       from 'gulp-uglify';


import { relativerequire }  from './utils';
import * as pipes           from './pipes/';
import * as paths           from './paths';

const api = {
  tasks: []
};

api.plugins = {
  sourcemaps,
  uglify
};

api.stream = browserSync.stream;

api.reload = browserSync.reload;

api.gulp = relativerequire('gulp');

api.paths = paths;

api.config = function () {
  return api;
}

api.lazypipe = (pipe) => {
  const lazy = pipes[pipe];

  return lazy()();
};

api.src = (...sources) => api.gulp.src.apply(api.gulp, sources);

api.dest = (dest) => api.gulp.dest(api.paths.build(dest));

api.queueTask = (task) => {
  if (api.tasks.indexOf(task) === -1) {
    api.tasks.push(task);
  }

  return api;
};

api.watch = (src, ...tasks) => {
  api.gulp.watch(src, api.gulp.series.apply(null, tasks));

  return api;
};

api.version = () => {
  console.log('api.gulp');
};

export default api;
