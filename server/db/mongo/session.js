import session from 'express-session';
import connectMongo from 'connect-mongo';
import config from './config';

const MongoStore = connectMongo(session);

export default () =>
  new MongoStore(
    {
      url: config.mongoURL,
      autoReconnect: true
    }
  );
