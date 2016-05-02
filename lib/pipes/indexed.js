'use strict';

import path     from 'path';
import through2 from 'through2';
import Promise  from 'bluebird';
import _        from 'lodash';

let index = {};

const indexed = () => {
  function parse(file) {
    let parts = path.parse(file.path);

    parts.dirType = _.last(parts.dir.split(path.sep));

    return [file, parts];
  }

  function register(file, parts) {
    let data = {
      title   : file.data.title || _.startCase(parts.name),
      tags    : _.compact((file.data.tags || '').split(',').map(_.trim)),
      path    : path.join(parts.dirType, parts.base)
    };

    !index[parts.dirType] && (index[parts.dirType] = {});
    index[parts.dirType][data.path] = data;
  }

  function indexed(file, enc, callback) {
    let promise;

    if (file.isNull()) {
      this.push(file);
    }

    if (file.isStream()) {
      this.emit('error', new Error('Indexed: streams not supported'));
    }

    if (file.isBuffer()) {
      promise = new Promise(resolve => {
        resolve(file);
      });

      promise.then(parse).spread(register).catch(callback);

      this.push(file);
    }

    return callback(null, file);
  }

  return through2.obj(indexed);
};

indexed.get = () => {
  return index;
};

export default indexed;
