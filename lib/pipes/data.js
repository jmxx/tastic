'use strict';

var lazypipe = require('lazypipe')
  , data     = require('gulp-data')
  , fs       = require('fs-extra');

module.exports = function () {
  return lazypipe()
    .pipe(data, function (file) {
      var stats = null
        , jsonFile = file.path.substr(0, file.path.lastIndexOf('.')) + '.data.json';

      try {
        fs.statSync(jsonFile);
        return require(jsonFile);
      } catch (e) {
        return {};
      }
    });
};
