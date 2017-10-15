import Filters from '../models/filter';
import Constant from '../constant';

const log4js = require('log4js');

const logger = log4js.getLogger('debug');
// logger.level = 'debug';

export default function () {
    Filters
        .count()
        .exec((err, count) => {
            if (count > 0) {
                return;
            }

            const vnExpress = new Filters({
                name: 'Báo VnExpress',
                domain: 'https://vnexpress.net',
                filter: {

                    publisher: {
                        url: 'https://vnexpress.net',
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
                            }
                        }
                    },

                    catelogries: [
                        {
                            url: 'https://vnexpress.net',
                            filter: {
    
                                listItem: 'body nav[id=main_menu] a',
                                data: {
                                    title: {
                                        how: "x => x.text()"
                                    },
                                    url: {
                                        attr: 'href'
                                    }
                                }
                            }
                        },
                        {
                            url: 'https://vnexpress.net',
                            filter: {
                                listItem: 'body section.cat_header div > a',
                                data: {
                                    title: {
                                        how: x => x.text()
                                    },
                                    url: {
                                        attr: 'href'
                                    }
                                }
                            }
                        },
                    ],
                },
                type: Constant.PUBLISHER_CODE
            });

            Filters.create([vnExpress], (error) => {
                if (!error) {
                    console.log('===> Filter bind success');
                    logger.info('Filter.js: Object Filters create success!');
                }
            });
        });
}