import NewsNode from '../models/newsnode';
import Constant from '../constant';

const log4js = require('log4js');

const logger = log4js.getLogger('debug');
// logger.level = 'debug';

export default function () {
    NewsNode.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const audio1 = new NewsNode({ 
        code: 'audio_code',
        type: Constant.ARTICLE_CODE,
        title: 'ĐỪNG LỠ ng&#224;y 8/10: Thủ khoa sư phạm ở nh&#224; chăn lợn; Siu Black, Phương Thanh nối lại t&#236;nh xưa',
        src: 'http://media1.netnews.vn/archive/radio/218/201710/20171008/12_053444308509112_Dunglothukhoa.mp3',
        content:'',
        thumb: {
            src: 'http://media1.netnews.vn/archive/imageslead/112/201710/20171008/thumb7_051817913209222wap_75.jpg',
            w: 0,
            h: 0
        },
    });


    const audio2 = new NewsNode({ 
        code: 'audio_code',
        type: Constant.ARTICLE_CODE,
        title: 'B&#227;o Nate đổ bộ nước Mỹ khi &#225;c mộng Irma chưa qua',
        src: 'http://media1.netnews.vn/archive/radio/218/201710/20171008/12_044518201186919_24._BaoNatedobo_nuuoc_Mi.mp3',
        content:'',        
        thumb: {
            src: 'http://media1.netnews.vn/archive/imageslead/118/201710/20171008/tinngan014950_552004251_88wap_650_11wap_75.jpg',
            w: 0,
            h: 0
        },
    });

    const audio3 = new NewsNode({ 
        code: 'audio_code',
        type: Constant.ARTICLE_CODE,
        title: 'Trộm tay xác ướp, du khách dính lời nguyền suốt 30 năm',
        src: 'http://media1.netnews.vn/archive/radio/218/201710/20171008/12_052909518194736_27._Tromtayxacuop_du_khach.mp3',
        content:'',        
        thumb: {
            src: 'http://media1.netnews.vn/archive/imageslead/148/201710/20171008/tinngan041050_637815414wap_650_11wap_75.jpg',
            w: 0,
            h: 0
        },
    });


    const audio4 = new NewsNode({ 
        code: 'audio_code',
        type: Constant.ARTICLE_CODE,
        title: '900.000 hộ treo chuồng, Bộ N&#244;ng nghiệp lại lo thiếu thịt heo',
        src: 'http://media1.netnews.vn/archive/radio/218/201710/20171008/12_044318425575944_22._900000hotreochuong.mp3',
        content:'',        
        thumb: {
            src: 'http://media1.netnews.vn/archive/imageslead/112/201710/20171008/thumb7_03051916577428wap_75.jpg',
            w: 0,
            h: 0
        },
    });
    

    NewsNode.create([audio1, audio2, audio3, audio4], (error) => {
      if (!error) {
        console.log('===> NewsNode bind success');
        logger.info('news_node.js: Object NewsNode create success!');
      }
    });

  });

}
