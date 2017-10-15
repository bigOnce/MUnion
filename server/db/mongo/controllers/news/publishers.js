import Publishers from '../../models/publisher'

export function all(req, res) {
    Publishers.find({}).exec((err, objects) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(objects);
      });
}


export default {
    all,
};
