import Filters from "../../models/filter";
import Constant from "../../../../../Constant";
import Utils from "../../utils";
import Publishers from "../../models/publisher";
import Catelogry from "../../models/catelogry";
import { Publisher, Category, NewsItem } from "../../models/news";
import Promise from "promise";
import { hostname } from "os";

export function scrapedomain(domain) {
  return new Promise(function(resolve, reject) {
    var finishedPub = false;
    var finishedCat = false;

    const resultCallback = results => {
      if (finishedPub && finishedCat) resolve(results);
    };

    if (domain !== undefined && domain.trim().length) {
      var resultLists = [];

      //  FIN IN FILTERS DATA OBJECT WITH DOMAIN
      Filters.findOne({ domain: domain }, function(err, result) {
        // ERROR
        if (err) throw err;

        // HAD FOUND TO PROCESS WITH FILTERS
        if (result) {
          const { filter, name, type } = result;
          const { publisher, categories } = filter;

          /////////////////////////////////
          //  PROCESS PUBLISHER FILTER
          /////////////////////////////////
          if (publisher !== undefined) {
            Publisher.findOne({ domain: domain }, (err, object) => {
              // ERROR
              if (err) throw err;

              // IF NOT FOUND, TO SCRAPE AND SAVE PUBLISHER TO DB
              if (!object) {
                Utils.scrape
                  .scrapeUrl(publisher.url, publisher.filter)
                  .then(results => {
                    if (results !== undefined) {
                      Utils.factory
                        .publisher(results, domain)
                        .then(result => {
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
                // IF FOUND PUBLISHER IN DB,
                resultLists.push(object);
                finishedPub = true;
                resultCallback(resultLists);
              }
            });
          }

          ///////////////////////////////////
          //PROCESS CATEGORY FILTER
          //////////////////////////////////
          if (categories !== undefined) {
            var categoryCounter = categories.length;
            categories.map(filterItem => {
              if (filterItem.url !== undefined) {
                Utils.scrape
                  .scrapeUrl(filterItem.url, {
                    [filterItem.fid]: filterItem.filter
                  })
                  .then(results => {
                    Utils.factory.category(results, domain).then(result => {
                      categoryCounter--;
                      resultLists.push(result);
                      if (categoryCounter === 0) {
                        finishedCat = true;
                      }
                      resultCallback(resultLists);
                    });
                  });
              }
            });
          }
        }
      });
    } else {
      // IF DOMAIN UNDEFINED
    }
  });
}

export function scrapeContainers(domain) {
  return new Promise((resolve, reject) => {
    if (domain !== undefined && domain.trim().length) {
      Filters.findOne({ domain: domain }, function(err, result) {
        if (err) throw err;

        if (result) {
          const { filter, name, type } = result;
          const { containers } = filter;
          var resultList = [];
          if (containers !== undefined) {
            const { category } = containers;
            var itemCount = category.length;

            if (category !== undefined && category.length) {
              category.map((object, index) => {
                const { url, filter } = object;

                if (url !== undefined && filter !== undefined) {
                  Utils.scrape
                    .scrapeUrl(url, { data: filter })
                    .then(results => {
                      Utils.factory
                        .containers(results.data, domain, url)
                        .then(result => {
                          itemCount = itemCount - 1;
                          resultList.push(result);
                          if (itemCount === 0) {
                            resolve(results);
                          }
                        });
                    });
                }
              });
            } else {
              resolve(results);
            }
            // END CONTAINER CHECK
          }
        }
      });
    }
  });
}

export function scrapeContents(domain) {
  return new Promise((resolve, reject) => {
    if (domain !== undefined && domain.trim().length) {
      Filters.findOne({ domain: domain }, function(err, result) {
        if (err) throw err;
        if (result) {
          const { filter, name, type } = result;
          const { contents } = filter;
          if (contents) {
            NewsItem.find({ domain: domain }, function(err, newsItemList) {
              if (newsItemList) {
                newsItemList.map(itemNews => {
                  let sourceContent = itemNews.source;
                  contents.map(itemFilter => {
                    let filterHostName = Utils.url.getHost(itemFilter.url);
                    let hostName = Utils.url.getHost(sourceContent);
                    if (filterHostName === hostName) {
                      Utils.scrape
                        .scrapeUrl(sourceContent, itemFilter.filter)
                        .then(result => {
                          if (result) {
                            Utils.factory
                              .contents(result, domain, sourceContent)
                              .then(contents => {
                                console.log(contents);
                              });
                          }
                        });
                    }
                  });
                });
              }
            });
          }
        }
      });
    }
  });
}

export default {
  scrapedomain,
  scrapeContainers,
  scrapeContents
};
