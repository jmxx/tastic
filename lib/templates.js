'use strict';

const templates = {};

const page = (title = 'Page\'s title', body = 'You can edit me!') => {
  return [
    '.page-content',
    `  h1.title ${title}`,
    '  br',
    `  p ${body}`
  ].join('\n');
};

const post = (title = 'Post\'s title', body = 'You can edit me!') => {
  return [
    '---',
    `title: ${title}`,
    'description: This is an awesome post',
    '---',
    '',
    `## ${title}`,
    '',
    body
  ].join('\n')
};

templates.pkg = {
    name: 'tastic'
  , version: '0.0.0'
  , dependencies: {
    'gulp': 'git://github.com/gulpjs/gulp.git#4.0',
    'gulp-stylus': '^2.3.1',
    'jquery': '^2.2.3',
    'then-jade': '^2.4.1'
  }
};

/**
 * Folder structure
 * @type {Object}
 */
templates.structure = {
  'package.json' : JSON.stringify(templates.pkg, null, 2),
  content : {
    pages : {
      'about.jade' : page('My first page!')
    },
    posts : {
      '2016-01-01-My-First-Post.md' : post('My first post!')
    }
  },
  'Gulpfile.js' : './resources/Gulpfile.example.js',
  '.gitignore' : './resources/git.ignore',
  themes: {
    default : './resources/themes/default'
  }
};

export default templates;

export {
  post,
  page
}
