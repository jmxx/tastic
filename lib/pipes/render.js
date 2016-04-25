'use strict';

var through2    = require('through2')
  , consolidate = require('consolidate')
  , Promise     = require('bluebird')
  , _           = require('lodash')
  , assetic     = require('../helpers').assetic;

module.exports = function (engine, data, options) {
  options = options || {};

  function render(file, data, useLayout) {
    data = data || {};

    data.assetic = assetic;

    if (useLayout) {
      return consolidate['jade'](file, data);
    } else {
      return consolidate[engine].render(String(file.contents), data);
    }
  }

  function renderize(file, enc, callback) {
    var self = this
      , promise
      , context = _.extend({}, data || {}, file.data || {});

    function buffer(html) {
      file.contents = new Buffer(html);
      self.push(file);
      callback();
    }

    if (file.contents instanceof Buffer) {
      try {
        if (engine === 'html') {
          promise = new Promise(function (resolve) {
            resolve(String(file.contents));
          });
        } else {
          promise = render(file, context);
        }

        promise.then(function (html) {
          if (options.layout) {
            context._content = html;
            return render(options.layout, context, true).then(buffer);
          }

          buffer(html);
        }).catch(callback);

      } catch (err) {
        callback(err);
      }
    } else {
      callback(new Error('Render: streams not supported'), undefined);
    }
  }


  return through2.obj(renderize);
};
