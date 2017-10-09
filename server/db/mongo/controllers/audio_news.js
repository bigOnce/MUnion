import NewsNode from '../models/newsnode';


export function all(req, res) {
    NewsNode.find({}).exec((err, audios) => {
        if (err) {
          console.log('Error in first query');
          return res.status(500).send('Something went wrong getting the data');
        }
    
        return res.json(audios);
      });
}


export default {
    all,
};
