import Filters from '../models/filter';
import Constant from '../constant';

const log4js = require('log4js');

const logger = log4js.getLogger('debug');
// logger.level = 'debug';

export default function () {
    Filters.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const vnExpress = new Filters({
        name: 'VnExpress',
        filterId: 'vnexpress',
        filter: {
                    title: {
                        selector: 'head title'
                    },
            
                    domain: {
                        selector: 'head link[rel=canonical]',
                        attr: 'href'
                    },
            
                    logo: {
                        selector: 'head meta[property="og:image"]',
                        attr: 'content'
                    },
            
                    description: {
                        selector: 'head meta[name=description]',
                        attr: 'content'
                    },
            
                    publisher: {
                        selector: 'head meta[name="dc.publisher"]',
                        attr: 'content'
                    },
            
                    keywords: {
                        selector: 'head meta[name="keywords"]',
                        attr: 'content'
                    },
            
                    catelogries: {
                        listItem: 'body nav[id=main_menu] a',
                        data: {
                            title: {
                                how: x => x.text()
                            },
                            url: {
                                attr: 'href'
                            }
                        }
                    },
            
                    subcatelogries: {
                        listItem: 'body section.cat_header div > a',
                        data: {
                            title: {
                                how: x => x.text()
                            },
                            url: {
                                attr: 'href'
                            }
                        }
                    },
            },
        type: Constant.PUBLISHER_CODE,
    });


    Filters.create([vnExpress], (error) => {
      if (!error) {
        console.log('===> filter bind success');
        logger.info('filter.js: Object Filters create success!');
      }
    });
  });
}
