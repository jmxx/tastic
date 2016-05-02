'use strict';

import lazypipe     from 'lazypipe';
import markdown     from 'gulp-markdown';
import data         from 'gulp-data';
import frontMatter  from 'front-matter';

export default () => {
  return lazypipe()
    .pipe(data, (file) => {
      const content = frontMatter(String(file.contents));
      file.contents = new Buffer(content.body);

      return content.attributes;
    })
    .pipe(markdown, {
      highlight: (code) => require('highlight.js').highlightAuto(code).value
    });
};
