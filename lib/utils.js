'use strict';

import _          from 'lodash';
import fs         from 'fs-extra';
import path       from 'path';
import Promise    from 'bluebird'
import * as tmpl  from './templates';
import * as paths from './paths';

const structure = function (folders, baseDir) {
  const fsStat        = Promise.promisify(fs.stat);
  const fsOutputFile  = Promise.promisify(fs.outputFile);
  const fsCopy        = Promise.promisify(fs.copy);
  let dir, itemValue, promises = [];

  const resolvePath = (dir, item) => {
    let resolvedPath = path.resolve(__dirname, '..', item);

    return fsStat(resolvedPath)
      .then(() => fsCopy(resolvedPath, dir))
      .catch(err => {
        if (dir && err.code === 'ENOENT') {
          return fsOutputFile(dir, item);
        }
      });
  };

  for (let item in folders) {
    if (!folders.hasOwnProperty(item)) {
      continue;
    }

    dir = path.join(baseDir || process.cwd(), item);
    itemValue = folders[item];

    /**
     * If itemValue is object, means that is a folder structure.
     */
    if ('object' === typeof itemValue) {
      promises.push(structure(itemValue, dir));
    }

    /**
     * If itemValue is string, means that is content of file, so
     * writes de content to a file.
     */
    if ('string' === typeof itemValue) {
      promises.push(resolvePath(dir, itemValue));
    }
  }

  return Promise.all(promises);
};

/**
 * Require module from relative path
 * @param  {string|object}    module    module name or options with module name and base directory
 */
const relativerequire = function (pckg) {
  let baseDir = process.cwd()
    , mappedPckgs = {}
    , pckgs;

  if (_.isPlainObject(pckg) && pckg.baseDir) {
    baseDir = pckg.baseDir;
    pckg = pckg.module;
  }

  pckgs = _.isString(pckg) ? [pckg] : pckg;

  _.forEach(pckgs, function (pckgName) {
      let pckgPath = path.join(baseDir, 'node_modules', pckgName);

      if (fs.existsSync(pckgPath)) {
        mappedPckgs[pckgName] = require(pckgPath);
      }
  });

  if (_.isEmpty(mappedPckgs)) {
    throw new Error('No one pckgs has been loaded');
  }

  return _.isArray(pckg) ? mappedPckgs : mappedPckgs[pckg];
};

const createContent = (type, title) => {
  const path = paths.content(type + 's/' + title + (type === 'post' ? '.md' : '.jade'));
  const fsOutputFile = Promise.promisify(fs.outputFile);

  return fsOutputFile(path[0], tmpl[type]).then(() => path[0]);
};

export {
  structure,
  relativerequire,
  createContent
}
