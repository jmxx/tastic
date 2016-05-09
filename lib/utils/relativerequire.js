'use strict';

import _          from 'lodash';
import fs         from 'fs-extra';
import path       from 'path';

/**
 * Require module from relative path
 * @param  {string|object}    module    module name or options with module name and base directory
 */
const relativerequire = (pckg) => {
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

export default relativerequire;