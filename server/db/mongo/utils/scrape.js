import cheerio from 'cheerio';
import request from 'request';
import tinyreq from 'tinyreq';
import scrapeIt from 'scrape-it';
import constant from '../constant';

export function scrape(url, filter, callback) {

    if (url) {

        // scrape url with filter
        scrapeIt(url, filter.filter, (err, page) => {
            if (err) {
                callback(constant.ERROR, err);
            } else if (page) {
                
                const filterType = filter.type;


                
                switch (filterType) {
                    case constant.PUBLISHER_CODE: // type is 10, define in ../constant
                        { 
                            scrapePublisher(page, callback);
                        }
                        break;

                    default:
                        callback(constant.FAILED, 'filter type invalid');
                        break;
                }

            } else {
                // try error undefine
                callback(constant.FAILED, 'scrape ' + url + 'failed');
            }

        });

    }

}

export function scrapePublisher(publisher, callback) {
    //  publisher is required, 

    const {catelogries, subcatelogries} = publisher;
    if (catelogries.length > 0) {
        catelogries.map((item) => {
            console.log(item);

        });
    }

    if (subcatelogries.length > 0) {
        subcatelogries.map((item) => {
            console.log(item);            
        });
    }

    callback(constant.SUCCESS, publisher);

}

