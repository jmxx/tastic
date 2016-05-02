'use strict';

import lazypipe from 'lazypipe';
import prettify from 'gulp-jsbeautifier';

export default () => {
  return lazypipe()
    .pipe(prettify, {
       indent_size: 2,
       indent_char: ' '
    })
    .pipe(prettify.reporter);
};
