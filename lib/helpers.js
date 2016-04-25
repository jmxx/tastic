'use strict';

var path = require('path');

function assetic(ext, file) {
  var production = false
    , manifest = {}; //require('./build/assets/rev-manifest.json');

  if (!file) {
    file = ext;
    ext = path.extname(file).substring(1);
  } else {
    file += ('.' + ext);
  }

  if (ext === 'js') {
    file = production ? manifest['js/' + file] : 'js/' + file;
    return '<script src="/' + file + '"></script>\n';
  } else if (ext === 'css') {
    file = production ? manifest['css/' + file] : 'css/' + file;
    return '<link rel="stylesheet" type="text/css" href="/' + file + '">\n';
  }

  return '';
}

module.exports.assetic = assetic;
