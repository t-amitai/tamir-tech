var path = require('path');
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
  devtool: 'inline-source-map',
  entry: `${SRC_DIR}/index.js`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      }
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
