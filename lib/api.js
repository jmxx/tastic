'use strict';

var path = require('path')
  , using = require('gulp-using')
  , browserSync = require('browser-sync');

var api = {
  tasks: []
};

api.gulp = require('./utils').relativerequire('gulp');

api.config = function () {

  return this;
}

api.plugins = {
  sourcemaps : require('gulp-sourcemaps'),
  uglify     : require('gulp-uglify')
};

api.stream = browserSync.stream;

api.reload = browserSync.reload;

api.lazypipe = function (pipe) {
  var lazy = require('./pipes/' + pipe);

  return lazy()();
};

api.paths = require('./paths');

api.src = function () {
  return api.gulp.src.apply(api.gulp, arguments);
};

api.dest = function (dest) {
  return api.gulp.dest(api.paths.build(dest));
};

api.queueTask = function (task) {
  if (api.tasks.indexOf(task) === -1) {
    api.tasks.push(task);
  }

  return this;
};

api.watch = function (src) {
  var tasks = Array.prototype.slice.call(arguments, 1);

  // api.gulp.watch(src, api.gulp.series.apply(null, tasks));

  return this;
};

api.version = function () {
  // console.log(api.gulp);
};

module.exports = api;
