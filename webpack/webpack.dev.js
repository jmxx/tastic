import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import webpack              from 'webpack';
import merge                from 'webpack-merge';
import baseConfig           from './webpack.common';

Object.keys(baseConfig.entry).forEach(function (name) {
  // this module is required to make HRM working, it's responsible for all this webpack magic
  baseConfig.entry[name] = [
    './webpack/hot-client'
  ].concat(baseConfig.entry[name]);
});

export default merge(baseConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new FriendlyErrorsPlugin()
  ]
});
