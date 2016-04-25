'use strict';

var path = require('path');

module.exports = function (baseDir, srcFiles) {
  if ('content' === baseDir) {
    baseDir = path.join(process.cwd(), 'content');
  } else if ('css' === baseDir) {
    baseDir = path.join(process.cwd(), 'themes', 'default', 'assets');
  } else if ('js' === baseDir) {
    baseDir = path.join(process.cwd(), 'themes', 'default', 'assets', 'js');
  } else if ('build' === baseDir) {
    return path.join(process.cwd(), baseDir, srcFiles);
  } else if (baseDir === 'theme') {
    return path.join(process.cwd(), 'themes', 'default', srcFiles);
  }

  if (!Array.isArray(srcFiles)) srcFiles = [srcFiles];

  return srcFiles.map(function (src) {
    if ('!' === src[0]) {
      return '!' + path.join(baseDir, src.substr(1));
    }

    return path.join(baseDir, src);
  });
};
