import cheerio from 'cheerio';
import request from 'request';
import tinyreq from 'tinyreq';
import scrapeIt from 'scrape-it';

export function scrape(url, filter, callback) {

    if (url) {

        scrapeIt(url, filter, (err, page) => {
            console.log(err || page);
        });
    }

}