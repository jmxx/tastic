require('babel-register')({
  extensions: ['.js']
});

module.exports = require('./lib').default;