'use strict';

// Modules
let webpack = require('webpack'),
  path = require('path'),
  autoprefixer = require('autoprefixer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WebpackNotifierPlugin = require('webpack-notifier'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  StringReplacePlugin = require('string-replace-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
let ENV = process.env.npm_lifecycle_event;
let isTest = ENV === 'test' || ENV === 'test-watch';
let isProd = ENV === 'build';
let isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;

let cwd = process.cwd();
let packageJson = require(path.resolve(cwd, 'package.json'));
let projectName = packageJson.name;
let host = process.env.WEBPACK_DEV_SERVER_HOST || 'localhost';
let port = process.env.WEBPACK_DEV_SERVER_PORT || 3000;

let proxyServer = {
};

module.exports = function makeWebpackConfig() {
  let config = {};
  config.entry = isTest ? {} : [
    'babel-polyfill',
    './src/app/index.module.js'
  ];

  if(isDevServer && !isTest) {
    config.entry.unshift(`webpack-dev-server/client?http://${host}:${port}/`);
  }
  config.output = isTest ? {} : {
    path: __dirname + '/dist',
    publicPath: isProd ? '/' : `http://${host}:${port}/`,
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  if(isTest) {
    config.devtool = 'inline-source-map';
  } else if(isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  config.module = {
    preLoaders: [],
    loaders: [{
      test: /\.js$/,
      loader: 'ng-annotate!babel',
      exclude: /node_modules/
    },  {
      test: /\.scss$/,
      loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css!sass')
    }, {
      test: /\.css$/,
      loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      test: /\.html$/,
      loader: 'raw'
    }]
  };

  if(isTest) {
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'isparta'
    })
  }

  config.postcss = [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ];

  config.plugins = [
    new StringReplacePlugin()
  ];

  if(!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      }),
      new ExtractTextPlugin('[name].[hash].css', {disable: !isProd})
    );

    if(isDevServer) {
      config.plugins.push(
        new WebpackNotifierPlugin({
          title: projectName
        })
      );
    }
  }

  if(isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([{
        from: __dirname + '/src'
      }])
    );
  }

  config.devServer = {
    contentBase: './src',
    stats: 'minimal',
    historyApiFallback: true,
    inline: true,
    progress: true,
    host: '0.0.0.0',
    port: port,
    proxy: proxyServer
  };

  return config;
}();
