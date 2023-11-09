// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {
  entry: "./src/index.js",
  mode: 'none',
  experiments: {
    futureDefaults: true,
    css: false,
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        sideEffects: true,
        include: [
         path.resolve(__dirname, 'src/style.css'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
        
      },
      {
       test: /\.(png|jpe?g|gif|svg)$/i,
       type: 'asset/resource'
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(
      { filename: '[name].[contenthash].css' },
    ),
    new HtmlWebpackPlugin({
      title: 'go outside today',
      template: './src/indexTemplate.html',
      scriptLoading: 'module',
    }),
  ],
};

module.exports = config;
