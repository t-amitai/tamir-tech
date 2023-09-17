const path = require('path');
const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
  devtool: 'inline-source-map',
  entry: `${SRC_DIR}/index.jsx`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  }
};
