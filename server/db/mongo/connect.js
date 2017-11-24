import mongoose from "mongoose";
import config from "./config";
import loadModels from "./models";
import loadData from "./dataloader";

export default () => {
  // Find the appropriate database to connect to, default to localhost if not
  // found.
  const connect = () => {
    mongoose.Promise = require("bluebird");
    mongoose.connect(
      config.mongoURL,
      {
        ocketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30,
        useMongoClient: true
      },
      err => {
        if (err) {
          console.log(`===>  Error connecting to ${config.mongoURL}`);
          console.log(`Reason: ${err}`);
        } else {
          console.log(`===>  Succeeded in connecting to ${config.mongoURL}`);
        }

        // feed some dummy data in DB.
        loadData();
      }
    );
  };
  connect();

  mongoose.connection.on("error", console.log);
  mongoose.connection.on("disconnected", connect);

  loadModels();
};
