'use strict';

import fs         from 'fs-extra';
import _          from 'lodash';
import moment     from 'moment';
import Promise    from 'bluebird'
import * as tmpl  from '../templates';
import * as paths from '../paths';

const getContentFilepath = (type, title) => {
  let path = '';
  const now = moment().format('YYYY-MM-DD');

  if ('page' === type) {
    path = `${type}s/${_.kebabCase(title)}.jade`;
  } else if('post' === type) {
    path = `${type}s/${now}-${_.kebabCase(title)}.md`;
  }

  return paths.content(path).pop();
};

const create = (type, title) => {
  const filepath = getContentFilepath(type, title);
  const content = tmpl[type](title);

  return Promise.promisify(fs.outputFile)(filepath, content)
    .then(() => filepath);
};

export {
  create
}