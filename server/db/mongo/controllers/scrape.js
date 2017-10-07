import * as scrape from '../utils/scrape';
import Filters from '../models/filter';
import constant from '../constant';

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
                    if (err != constant.ERROR) {
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

export default {
    scrapeWithFilter
};
