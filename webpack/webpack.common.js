import path               from 'path';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin  from 'html-webpack-plugin';


const paths = {
  app: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};

const entry = {
  app: [
     path.join(paths.app, 'js/app.styl'),
     path.join(paths.app, 'js/app.js'),
  ]
};

const extractStyle = new ExtractTextPlugin({
  filename: 'css/[name].css',
  disable: true
});

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
      },
      {
        test: /\.styl$/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'stylus-loader',
          ]
        })
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    extractStyle,

    new HtmlWebpackPlugin({
      template: path.resolve(paths.app, 'index.html'),
      inject: true,
      // inject: 'body',
      hash: true,
      // chunks: ['vendors', 'app']
    }),
  ]
};
