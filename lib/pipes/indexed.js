'use strict';

var path        = require('path')
  , through2    = require('through2')
  , Promise     = require('bluebird')
  , _           = require('lodash');

module.exports = function () {
  function parse(filePath) {
    var parts = path.parse(filePath);

    parts.dirType = _.last(parts.dir.split(path.sep));

    return parts;
  }

  function indexed(file, enc, callback) {
    var parts = parse(file.path);

    var data = {
      title   : file.data.title || _.startCase(parts.name),
      tags    : _.compact((file.data.tags || '').split(',').map(_.trim)),
      path    : path.join(parts.dirType, parts.base)
    };

    // console.log(this);
    // console.log(this.push);
    // console.log(data);
    // this.push(data);

    callback();
  }


  return through2.obj(indexed);
};
