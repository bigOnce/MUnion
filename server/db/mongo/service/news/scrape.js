import Filters from '../../models/filter';
import Constant from '../../../../../Constant';
import utils from '../../utils';

var Promise = require('promise');

export function scrapedomain(domain) {
    return new Promise(function (resolve, reject) {
        var finishedPub = false;
        var finishedCat = false;
        var finishedCon = true;

        const resultCallback = ((results) => {
            if (finishedPub && finishedCat && finishedCon) 
                resolve(results);
            }
        );

        if (domain !== undefined && domain.trim().length) {
            var resultLists = [];

            //  FIN IN FILTERS DATA OBJECT WITH DOMAIN
            Filters.findOne({
                domain: domain
            }, function (err, result) {
                if (err) {
                    throw err;
                }
                // HAD FOUND TO PROCESS WITH FILTERS
                if (result) {

                    const {filter, name, type} = result;
                    const {publisher, catelogries, contents, containers} = filter;

                    // PROCESS PUBLISHER
                    if (publisher !== undefined) {
                        // utils     .scrape     .scrapeUrl(publisher.url, publisher.filter)
                        // .then((results) => {         utils             .factory .publisher(results,
                        // domain)             .then((result) => { resultLists.push(result);
                        //     finishedPub = true; resultCallback(resultLists);             })
                        //   .catch((err, result) => {                 resultLists.push(result);
                        //         finishedPub = true;                 resultCallback(resultLists);
                        //        });     });
                    }

                    if (catelogries !== undefined) {
                        var catelogriesCount = catelogries.length - 1;
                        catelogries.map((filterItem) => {
                            // utils     .scrape     .scrapeUrl(filterItem.url, {         [filterItem.fid]:
                            // filterItem.filter     })     .then((results) => {         utils .factory
                            //        .catelogry(results, domain)             .then((result) => {
                            //      catelogriesCount--; resultLists.push(result);                 if
                            // (catelogriesCount === 0) {               finishedCat = true;
                            // } resultCallback(resultLists);             });     });
                        })
                    }

                    if (containers !== undefined) {
                        const {catelogries} = containers;
                        if (catelogries !== undefined && catelogries.length) {
                            catelogries.map((object, index) => {
                                const {url, filter} = object;
                                if (url !== undefined && filter !== undefined) {
                                    utils
                                        .scrape
                                        .scrapeUrl(url, {[index]: filter})
                                        .then((results) => {
                                            console.log(JSON.stringify(results));
                                        });
                                }
                            });
                        }
                    }

                } else {
                    resolve(utils.factory.responseMsg('Not found filter for domain: ' + domain));
                }
            });
        } else 
            resolve(utils.factory.responseMsg('Domain incorrect!'));
        }
    );
}

export default {
    scrapedomain
};
