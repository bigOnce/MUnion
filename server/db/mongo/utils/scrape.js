import cheerio from 'cheerio';
import request from 'request';
import tinyreq from 'tinyreq';
import scrapeIt from 'scrape-it';
import constant from '../constant';
import urlUtils from './urls';
import factory from './factory';
var Promise = require('promise');

export function scrapeUrl(url, filter) {

    return new Promise(function (resolve, reject) {

        let host = urlUtils.getHost(url);
        if (host.trim().length && filter) {
            // scrape url with filter
            scrapeIt(url, filter, (err, page) => {
                if (err) {
                    throw err;
                }

                if (page) {
                    resolve(page);
                } else 
                    resolve(factory.responseMsg('Incorrect filter'));
                }
            );

        } else {
            resolve(factory.responseMsg('Incorrect url'));
        }
    });

}

export default {
    scrapeUrl
};
