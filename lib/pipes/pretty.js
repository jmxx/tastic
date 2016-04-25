'use strict';

var lazypipe = require('lazypipe')
  , prettify = require('gulp-jsbeautifier');

module.exports = function () {
  return lazypipe()
    .pipe(prettify, {
       indent_size: 2,
       indent_char: ' '
    })
    .pipe(prettify.reporter);
};
