import * as parser from '../utils/parser';

export function parseURL(req, res) {

    let topic = req.body.topic;
    let url = topic.url;
    console.log(topic);
    console.log(url);

    if (url) {

      parser.parseUrl(url, (data) => {
        res.status(200).json({url: topic.url, data: data});      
        
      });
    }
    else res.status(500).send('error');
}


export default {
    parseURL,
};
