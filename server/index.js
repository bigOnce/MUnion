import express from 'express';
import webpack from 'webpack';
import {isDebug} from '../config/app';
import {connect} from './db';
import initPassport from './init/passport';
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';

import log4js from 'log4js';

log4js.configure({
  appenders: {
    debug: {
      type: 'file',
      filename: './logs/debug.log'
    }
  },
  categories: {
    default: {
      appenders: ['debug'],
      level: 'debug'
    }
  }
});

const app = express();

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

/*
 * REMOVE if you do not need passport configuration
 */
initPassport();

if (isDebug) {
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');
  const devBrowserConfig = webpackConfig({browser: true});
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: devBrowserConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
initRoutes(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
app.get('*', renderMiddleware);

app.listen(app.get('port'));
