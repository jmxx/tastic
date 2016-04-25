'use strict';

var _ = require('lodash')
  , fs = require('fs-extra')
  , path = require('path');

module.exports.structure = function (structure, baseDir) {
  var dir
    , itemValue
    , success = function (err) {
      err && console.log(err);
    }, resolvePath = function (dir, item) {
      var resolvedPath = path.resolve(__dirname, '..', item);

      fs.stat(resolvedPath, function (err, stats) {

        if (err) {
          if (dir && err.code === 'ENOENT') {
            fs.outputFile(dir, item, success);
          }
        } else {
          fs.copy(resolvedPath, dir, success);
        }
      });
    };

  for (var item in structure) {

    if (!structure.hasOwnProperty(item)) {
      continue;
    }

    dir = path.join(baseDir || process.cwd(), item);
    itemValue = structure[item];

    /**
     * If itemValue is object, means that is a folder structure.
     */
    if ('object' === typeof itemValue) {
      module.exports.structure(itemValue, dir);
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
module.exports.relativerequire = function (pckg) {
  var baseDir = process.cwd()
    , mappedPckgs = {}
    , pckgs;

  if (_.isPlainObject(pckg) && pckg.baseDir) {
    baseDir = pckg.baseDir;
    pckg = pckg.module;
  }

  pckgs = _.isString(pckg) ? [pckg] : pckg;

  _.forEach(pckgs, function (pckgName) {
      var pckgPath = path.join(baseDir, 'node_modules', pckgName);

      if (fs.existsSync(pckgPath)) {
        mappedPckgs[pckgName] = require(pckgPath);
      }
  });

  if (_.isEmpty(mappedPckgs)) {
    throw new Error('No one pckgs has been loaded');
  }

  return _.isArray(pckg) ? mappedPckgs : mappedPckgs[pckg];
};
