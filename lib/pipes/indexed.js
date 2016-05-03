'use strict';

import path     from 'path';
import through2 from 'through2';
import Promise  from 'bluebird';
import _        from 'lodash';

const REGEXP = /((\d{4})-(\d{2})-(\d{2}))-(.+)/;
const URLS = {
  posts: '/posts/:year/:month/:postname',
  pages: '/pages/:pagename'
};
let index = {};

const getUrl = (filename) => {
  const [fullname, ,year, month, day, name] = REGEXP.exec(filename) || [];

  if (fullname) {
    const date = new Date(year, month, day);

    return (URLS.posts)
      .replace(':year', date.getFullYear())
      .replace(':month', _.padStart(date.getMonth(), 2, '0'))
      .replace(':day', _.padStart(date.getDate(), 2, '0'))
      .replace(':postname', name);
  } else {
    return (URLS.pages)
      .replace(':pagename', filename);
  }
};

const indexed = (opts = {}) => {
  function parse(file) {
    let parts = path.parse(file.path);

    parts.dirType = _.last(parts.dir.split(path.sep));

    return [file, parts];
  }

  function register(file, parts) {
    let data = {
      title   : file.data.title || _.startCase(parts.name),
      tags    : _.compact((file.data.tags || '').split(',').map(_.trim)),
      path    : opts.url ? opts.url(file, parts) : getUrl(parts.name)
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
