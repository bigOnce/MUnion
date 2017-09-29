import NodeType from '../models/nodetype';


export function noteTypeList (req, res) {
    NodeType.find().sort('-timeCreate').exec((err, types) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ types });
      });

}


export default {
    noteTypeList,
};
