'use strict';

import lazypipe from 'lazypipe';
import data     from 'gulp-data';
import fs       from 'fs-extra';

export default () => {
  return lazypipe()
    .pipe(data, function (file) {
      const jsonFile = file.path.substr(0, file.path.lastIndexOf('.')) + '.data.json';

      try {
        fs.statSync(jsonFile);
        return require(jsonFile);
      } catch (e) {
        return {};
      }
    });
};
