'use strict';

var gulp    = require('gulp')
  , tastic  = require('tastic');

tastic(function (api) {
  api
    // .config({
    //
    // })
    // .theme('default')
    .stylus('stylus/main.styl')
    .posts()
    .pages()
    .index()
    .browserify('js/main.js')
    .serve();
});
