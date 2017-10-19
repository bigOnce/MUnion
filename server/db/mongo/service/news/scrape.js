import Filters from '../../models/filter';
import Constant from '../../../../../Constant';
import utils from '../../utils';

var Promise = require('promise');

export function scrapedomain(domain) {
    return new Promise(function (resolve, reject) {
        if (domain.trim().length) {
            Filters
                .findOne({
                    domain: domain
                }, function (err, result) {
                    if (err) 
                        resolve(err);
                    
                    if (result) {
                        const {filter, name, type} = result;
                        const {publisher, catelogries, contents} = filter;

                        if (publisher) {
                            utils
                                .scrape
                                .scrapeUrl(publisher.url, publisher.filter)
                                .then((results) => {
                                    utils
                                        .factory
                                        .publisher(results, domain)
                                        .then((result) => {
                                            resolve(result);
                                        });
                                })
                                .catch((results) => {
                                    resolve(results);
                                })

                        } else {
                            resolve(utils.factory.responseMsg('not found publisher filter'));
                        }

                    } else {
                        resolve(utils.factory.responseMsg('not found filter for domain: ' + domain));
                    }
                });
        } else 
            reject(utils.factory.responseMsg('Domain incorrect!'));
        }
    );

}

export default {
    scrapedomain
};
