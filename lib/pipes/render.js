'use strict';

import through2    from 'through2';
import consolidate from 'consolidate';
import Promise     from 'bluebird';
import _           from 'lodash';
import { assetic } from '../helpers';

export default (engine, data = {}, options = {}) => {
  function render(file, data = {}, useLayout = false) {
    data.assetic = assetic;

    if (useLayout) {
      return consolidate['jade'](file, data);
    } else {
      return consolidate[engine].render(String(file.contents), data);
    }
  }

  function renderize(file, enc, callback) {
    let self = this
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

        promise.then((html) => {
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
