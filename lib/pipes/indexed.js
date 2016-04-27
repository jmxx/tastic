'use strict';

var path        = require('path')
  , through2    = require('through2')
  , Promise     = require('bluebird')
  , _           = require('lodash');

var index = {};

module.exports = function () {
  function parse(file) {
    var parts = path.parse(file.path);

    parts.dirType = _.last(parts.dir.split(path.sep));

    return [file, parts];
  }

  function register(file, parts) {
    var data = {
      title   : file.data.title || _.startCase(parts.name),
      tags    : _.compact((file.data.tags || '').split(',').map(_.trim)),
      path    : path.join(parts.dirType, parts.base)
    };

    !index[parts.dirType] && (index[parts.dirType] = {});
    index[parts.dirType][data.path] = data;
  }

  function indexed(file, enc, callback) {
    var promise;

    if (file.isNull()) {
      this.push(file);
    }

    if (file.isStream()) {
      this.emit('error', new Error('Indexed: streams not supported'));
    }

    if (file.isBuffer()) {
      promise = new Promise(function (resolve) {
        resolve(file);
      });

      promise.then(parse).spread(register).catch(callback);

      this.push(file);
    }

    return callback(null, file);
  }

  return through2.obj(indexed);
};

module.exports.get = function () {
  return index;
};
