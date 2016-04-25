#! /usr/bin/env node

'use strict';

var commander = require('commander');

var utils = require('./utils')
  , tmpls = require('./templates');

commander
  .command('init [name]')
  .description('initializes Tastic! app with name, default to tastic')
  .action(function (name, opts) {
    name = name || 'tastic';
    utils.structure(tmpls.structure, process.cwd() + '/' + name);
  });

commander
  .command('update')
  .description('updates Tastic! app')
  .action(function () {
    utils.structure(tmpls.structure, process.cwd());
  });

commander
  .command('api [command]')
  .description('test api')
  .action(function (command) {
    var api = require('./api');

    api[command] && api[command]();
  });

commander.parse(process.argv);

if (!commander.args.length) {
  console.log('build');
}
