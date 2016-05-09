'use strict';

import fs         from 'fs-extra';
import path       from 'path';
import Promise    from 'bluebird'

const structure = (folders, baseDir) => {
  const fsStat        = Promise.promisify(fs.stat);
  const fsOutputFile  = Promise.promisify(fs.outputFile);
  const fsCopy        = Promise.promisify(fs.copy);

  let dir, itemValue, promises = [];

  const resolvePath = (dir, item) => {
    let resolvedPath = path.resolve(__dirname, '..', '..', item);

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

export default structure;
