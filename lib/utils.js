'use strict';

import _    from 'lodash';
import fs   from 'fs-extra';
import path from 'path';

const structure = function (folders, baseDir) {
  let dir, itemValue;

  const success = (err) => {
    err && console.log(err);
  };

  const resolvePath = (dir, item) => {
      let resolvedPath = path.resolve(__dirname, '..', item);

      fs.stat(resolvedPath, (err, stats) => {
        if (err) {
          if (dir && err.code === 'ENOENT') {
            fs.outputFile(dir, item, success);
          }
        } else {
          fs.copy(resolvedPath, dir, success);
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
      structure(itemValue, dir);
    }

    /**
     * If itemValue is string, means that is content of file, so
     * writes de content to a file.
     */
    if ('string' === typeof itemValue) {
      resolvePath(dir, itemValue);
    }
  }
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

export {
  structure,
  relativerequire
}
