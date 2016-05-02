'use strict';

import path from 'path';

const cwd = process.cwd();

function map (baseDir, srcFiles) {
  if (!Array.isArray(srcFiles)) srcFiles = [srcFiles];

  return srcFiles.map(src => {
    if ('!' === src[0]) {
      return '!' + path.join(baseDir, src.substr(1));
    }

    return path.join(baseDir, src);
  });
}

const content = (srcFiles) => map(path.join(cwd, 'content'), srcFiles);

const assets = (srcFiles) => map(path.join(cwd, 'themes', 'default', 'assets'), srcFiles);

const build = (filepath) => path.join(cwd, 'build', filepath || '');

const theme = (filepath) => path.join(cwd, 'themes', 'default', filepath || '');

export {
  content,
  assets,
  build,
  theme
};
