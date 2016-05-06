'use strict';

const templates = {};

const pkg = {
    name: 'tastic'
  , version: '0.0.0'
  , dependencies: {
    'gulp': 'git://github.com/gulpjs/gulp.git#4.0',
    'gulp-gh-pages': '^0.5.4',
    'gulp-stylus': '^2.3.1',
    "jquery": "^2.2.3",
    "then-jade": "^2.4.1"
  }
};

const page = [
  '.page-content',
  '  h1.title My First Page',
  '  br',
  '  p You can edit me!'
].join('\n');

const post = [
  '---',
  'title: My first Post!',
  'description: This is an awesome post',
  '---',
  '',
  '## My First Post',
  '',
  'You can edit me!'
].join('\n');

/**
 * Folder structure
 * @type {Object}
 */
templates.structure = {
  'package.json' : JSON.stringify(pkg, null, 2),
  content : {
    pages : {
      'about.jade' : page
    },
    posts : {
      '2016-01-01-My-First-Post.md' : post
    }
  },
  'Gulpfile.js' : './resources/Gulpfile.example.js',
  '.gitignore' : './resources/git.ignore',
  themes: {
    default : './resources/themes/default'
  }
};

export default templates;
