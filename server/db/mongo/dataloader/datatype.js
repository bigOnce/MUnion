import NodeType from '../models/nodetype';
import Constant from '../constant';

const log4js = require('log4js');

const logger = log4js.getLogger('debug');
// logger.level = 'debug';

export default function () {
    NodeType.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const type1 = new NodeType({ code: Constant.TEXT_CODE, type: 'TEXT', desc: 'Define for TEXT Node'});
    const type2 = new NodeType({ code: Constant.IMAGE_CODE, type: 'IMAGE', desc: 'Define for IMAGE Node'});

    const type20 = new NodeType({ code: Constant.ANCHOR_CODE, type: 'ANCHOR', desc: 'Define for ANCHOR Node'});

    const type30 = new NodeType({ code: Constant.ARTICLE_CODE, type: 'ARTICLE', desc: 'Define for ARTICLE Node'});
    const type31 = new NodeType({ code: Constant.VIDEO_CODE, type: 'VIDEO', desc: 'Define for VIDEO Node'});
    const type32 = new NodeType({ code: Constant.AUDIO_CODE, type: 'AUDIO', desc: 'Define for AUDIO Node'});


    NodeType.create([type1, type2, type20, type30, type31, type32], (error) => {
      if (!error) {
        console.log('===> NoteType bind success');
        logger.info('datatype.js: Object NodeType create success!');
      }
    });
  });
}
