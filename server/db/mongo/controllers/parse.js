import * as parser from '../utils/parser';

export function parseURL(req, res) {
  const topic = req.body.topic;
  const url = topic.url;
  if (url) {
    parser.parseUrl(url, (data) => {
      res
        .status(200)
        .json({url: topic.url, data});
    });
  } else 
    res
      .status(500)
      .send('error');
  }

export default {
  parseURL
};
