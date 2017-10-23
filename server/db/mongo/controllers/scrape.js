import {scrape} from '../utils';
import Filters from '../models/filter';
import Constant from '../../../../constant';
import Scrape from '../service/news/scrape';
var Promise = require('promise');


/**
 * scrape url with htmltag{class, id}
 * @param {url, filter} req
 * @param {url, data} res
 */
export function scrapeWithFilter(req, res) {
    var filterReq = req.body.filter;
    const url = req.body.url;

    // vnexpress home
    Filters
        .findOne({filterId: 'vnexpress'})
        .exec((err, filter) => {
            if (err) {
                console.log('Error in first query');
                return res
                    .status(500)
                    .send('Something went wrong getting the data');
            }

            if (url && filter) {
                scrape.scrape(url, filter, (err, rs) => {
                    if (err != Constant.ERROR) {
                        res
                        .status(200)
                        .json(rs);
                    } else {
                        res
                        .status(500)
                        .send('error');
                    }
                });

            } else 
                res
                    .status(500)
                    .send('error');
            }
        );

}

export function scrapeDomains(req, res) {

    Promise.all([

        Scrape.scrapedomain('http://gamek.vn'),
        Scrape.scrapedomain('https://vnexpress.net'),
        Scrape.scrapedomain('http://www.24h.com.vn'),

    ]).then((results) => {
        res.status(Constant.RESPONSE_SUCCESS).json(results);
    }).catch((results) => {
        res.status(Constant.ERROR_BAD_REQUEST).json(results);
    });
    
  
}

export default {
    scrapeWithFilter,
    scrapeDomains
};
