import express              from 'express';
import opn                  from 'opn';
import webpack              from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig        from './webpack.dev';

const port = 3000;
const app = express()
const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {

});
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {}
});

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, done) => {
    hotMiddleware.publish({ action: 'reload' })
    done();
  });
});

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

let _resolve;
const uri = 'http://localhost:' + port;
const readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n');
  // when env is testing, don't need open it
  // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  // }
  _resolve();
});

let server = app.listen(port);

export default {
  ready: readyPromise,
  close() {
    server.close();
  }
};
