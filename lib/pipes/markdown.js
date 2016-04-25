'use strict';

var lazypipe = require('lazypipe')
  , markdown = require('gulp-markdown')
  , data = require('gulp-data')
  , frontMatter = require('front-matter');

module.exports = function () {
  return lazypipe()
    .pipe(data, function (file) {
      var content = frontMatter(String(file.contents));
      file.contents = new Buffer(content.body);

      return content.attributes;
    })
    .pipe(markdown, {
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
      }
    });
};
