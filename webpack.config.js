const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/main.js',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(png|ttf|jpg|gif|svg|woff)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
  },
};
