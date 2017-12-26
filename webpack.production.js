/**
 * Webpack config for development
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: `${__dirname}/code.js`
  },
  output: {
    path: './lib',
    filename: 'yourlib.js',
    libraryTarget: 'var',
    library: 'EntryPoint'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.bundled.html`,
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      {from:'myresources',to:'Resources'}
    ])
  ],
  devServer: {
    disableHostCheck: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }
};
