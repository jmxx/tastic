import path               from 'path';
import HtmlWebpackPlugin  from 'html-webpack-plugin';


const paths = {
  app: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};

const entry = {
  app: path.join(paths.app, 'js/app.js')
};

export default {
  entry,
  output: {
    path: paths.dist,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.app, 'index.html'),
      inject: true,
      // inject: 'body',
      hash: true,
      // chunks: ['vendors', 'app']
    }),
  ]
};
