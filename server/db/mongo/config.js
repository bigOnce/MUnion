// export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI ||
// 'mongodb://localhost/ReactWebpackNode'; export default {   db };

const config = {
  mongoURL: process.env.MONGOHQ_URL || process.env.MONGODB_URI || (__PRODUCTION__ ? 'mongodb://bao-db-mongodb/newsdb' : 'mongodb://localhost/newsdb'),
  port: process.env.PORT || 8000,
  dev: process.env.NODE_ENV == 'development'
};

export default config;
