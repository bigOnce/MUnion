import mongoose from 'mongoose';
import config from './config';
import loadModels from './models';
import dataTypes from './dataloader/datatype';
import filters from './dataloader/filter';
import newsnode from './dataloader/newsnode'

export default () => {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connect = () => {
    mongoose.Promise = require('bluebird');
    mongoose.connect(config.mongoURL, {
      ocketTimeoutMS: 0,
      keepAlive: true,
      reconnectTries: 30,
      useMongoClient: true,
    }, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${config.mongoURL}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${config.mongoURL}`);
      }

        // feed some dummy data in DB.
        dataTypes();
        filters();
        newsnode();
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

  loadModels();
};
