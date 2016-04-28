'use strict';

var path = require('path')
  , cwd = process.cwd();

function map (baseDir, srcFiles) {
  if (!Array.isArray(srcFiles)) srcFiles = [srcFiles];

  return srcFiles.map(function (src) {
    if ('!' === src[0]) {
      return '!' + path.join(baseDir, src.substr(1));
    }

    return path.join(baseDir, src);
  });
}

module.exports.content = function (srcFiles) {
  return map(path.join(cwd, 'content'), srcFiles);
};

module.exports.assets = function (srcFiles) {
  return map(path.join(cwd, 'themes', 'default', 'assets'), srcFiles);
};

module.exports.build = function (filepath) {
  return path.join(cwd, 'build', filepath || '');
};

module.exports.theme = function (filepath) {
  return path.join(cwd, 'themes', 'default', filepath || '');
};
