'use strict';

import commander  from 'commander';
import * as utils from './utils';
import templates  from'./templates';

const cwd = process.cwd();

commander
  .command('init [name]')
  .description('initializes Tastic! app with name, default to tastic')
  .action((name = 'tastic', opts = {}) => {
    utils.structure(templates.structure, cwd + '/' + name);
  });

commander
  .command('update')
  .description('updates Tastic! app')
  .action(() => {
    utils.structure(templates.structure, cwd);
  });

commander
  .command('api [command]')
  .description('test api')
  .action((command) => {
    let api  = require('./api').default;

    api[command] && api[command]();
  });

commander.parse(process.argv);

if (!commander.args.length) {
  console.log('build');
}
