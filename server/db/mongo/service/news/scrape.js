import Filters from '../../models/filter';
import Constant from '../../../../../Constant';
import Utils from '../../utils';
import Publishers from '../../models/publisher';
import Catelogry from '../../models/catelogry';
import {Publisher, Category} from '../../models/news';

var Promise = require('promise');

export function scrapedomain(domain) {
    return new Promise(function (resolve, reject) {
        var finishedPub = false;
        var finishedCat = false;
        var finishedCon = false;

        const resultCallback = ((results) => {
            if (finishedPub === true) 
                console.log("finishedPub");
            if (finishedCat === true) 
                console.log("finishedCat");
            if (finishedCon === true) 
                console.log("finishedCon");
            
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
                    const {publisher, categories, contents, containers} = filter;

                    /////////////////////////////////
                    //  PROCESS PUBLISHER FILTER
                    /////////////////////////////////
                    if (publisher !== undefined) {
                        Publisher.findOne({
                            domain: domain
                        }, (err, object) => {

                            // ERROR
                            if (err) 
                                throw err;
                                
                            // NOT EXIST PUBLISHER IN DB
                            if (!object) {

                                Utils
                                    .scrape
                                    .scrapeUrl(publisher.url, publisher.filter)
                                    .then((results) => {
                                        if (results !== undefined) {
                                            Utils
                                                .factory
                                                .publisher(results, domain)
                                                .then((result) => {
                                                    resultLists.push(result);
                                                    finishedPub = true;
                                                    resultCallback(resultLists);
                                                })
                                                .catch((err, result) => {
                                                    resultLists.push(result);
                                                    finishedPub = true;
                                                    resultCallback(resultLists);
                                                });
                                        } else {
                                            finishedPub = true;
                                            resultCallback(resultLists);
                                        }
                                    });
                                    
                            } else {
                                finishedPub = true;
                                resultCallback(resultLists);
                            }
                        });
                    }

                    ///////////////////////////////////
                    //PROCESS CATEGORY FILTER
                    //////////////////////////////////

                    if (categories !== undefined) {
                        var categoryCounter = categories.length - 1;
                        categories.map((filterItem) => {
                            if (filterItem.url !== undefined) {
                                Utils
                                    .scrape
                                    .scrapeUrl(filterItem.url, {
                                        [filterItem.fid]: filterItem.filter
                                    })
                                    .then((results) => {
                                        Utils
                                            .factory
                                            .category(results, domain)
                                            .then((result) => {
                                                categoryCounter--;
                                                resultLists.push(result);
                                                if (categoryCounter === 0) {
                                                    finishedCat = true;
                                                }
                                                resultCallback(resultLists);
                                            });
                                    });
                            }
                        })
                    }

                    //////////////////////////////////
                    // Container
                    //////////////////////////////////

                    if (containers !== undefined) {
                        const {category} = containers;
                        var itemCount = category.length - 1;
                        
                        if (category !== undefined && category.length) {
                            category.map((object, index) => {
                                const {url, filter} = object;
                                if (url !== undefined && filter !== undefined) {

                                    Utils
                                        .scrape
                                        .scrapeUrl(url, {'data': filter})
                                        .then((results) => {
                                            Utils
                                                .factory
                                                .containers(results.data, domain, url)
                                                .then((result) => {
                                                    itemCount = itemCount - 1;
                                                    resultLists.push(result);
                                                    if (itemCount === 0) {
                                                        finishedCon = true;
                                                    }
                                                    resultCallback(resultLists);
                                                });
                                        });
                                }
                            });
                        } else {
                            finishedCon = true;
                            resultCallback(resultLists);                            
                        }
                    }

                } else {
                    resolve(Utils.factory.responseMsg('Not found filter for domain: ' + domain));
                }
            });
        } else 
            resolve(Utils.factory.responseMsg('Domain incorrect!'));
        }
    );
}

export default {
    scrapedomain
};
