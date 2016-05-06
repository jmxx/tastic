'use strict';

import { spawn }          from 'child_process';
import commander          from 'commander';
import inquirer           from 'inquirer';
import * as utils         from './utils';
import templates          from './templates';

const cwd = process.cwd();

commander
  .command('init [name]')
  .description('initializes Tastic! app with name, default to tastic')
  .action((name = 'tastic', opts = {}) => {
    const dir = cwd + '/' + name;
    utils.structure(templates.structure, dir).then(() => {
      spawn('git', ['init'], {
        stdio: 'inherit',
        cwd: dir
      }).on('close', () => {
        console.log('Tastic!');
      });
    });
  });

commander
  .command('add [type]')
  .option('-t, --title [value]', 'Content\'s title.')
  .description('Creates new page or post')
  .action((type, opts) => {
    const types = ['page', 'post'];
    const questions = [
      {
        type: 'list',
        name: 'type',
        choices: types,
        message: 'What type of content',
        when: () => !type || types.indexOf(type) === -1,
      },
      {
        type: 'input',
        name: 'title',
        message: (answers) => 'What\'s the title of the ' + (answers.type || type),
        when: () => !opts.title
      }
    ];

    inquirer.prompt(questions).then((answers) => {
      const title = answers.title || opts.title;
      type = answers.type || type;

      utils.createContent(type, title).then((path) => {
        console.log(path);
      });

    }).catch((err) => console.log(err));
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
  spawn('gulp', [], {
    stdio: 'inherit'
  });
}
