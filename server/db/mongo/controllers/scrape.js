import { scrape } from "../utils";
import Filters from "../models/filter";
import Constant from "../../../../constant";
import Scrape from "../service/news/scrape";
import Promise from "promise";

/**
 * scrape url with htmltag{class, id}
 * @param {url, filter} req
 * @param {url, data} ress
 */

const domainList = [];

export function scrapePublishers(req, res) {
  Promise.all([
    // Scrape.scrapedomain('http://gamek.vn'),
    // Scrape.scrapedomain('http://www.24h.com.vn'),
    Scrape.scrapedomain("https://vnexpress.net")
  ])
    .then(results => {
      res.status(Constant.RESPONSE_SUCCESS).json(results);
    })
    .catch(results => {
      res.status(Constant.ERROR_BAD_REQUEST).json(results);
    });
}

export function scrapeContainers(req, res) {
  Promise.all([Scrape.scrapeContainers("https://vnexpress.net")])
    .then(result => {
      res.status(Constant.RESPONSE_SUCCESS).json(result);
    })
    .catch(result => {
      res.status(Constant.ERROR_BAD_REQUEST).json(result);
    });
}

export function scrapeContents(req, res) {
  Promise.all([Scrape.scrapeContents("https://vnexpress.net")])
    .then(result => {
      res.status(Constant.RESPONSE_SUCCESS).json(result);
    })
    .catch(result => {
      res.status(Constant.ERROR_BAD_REQUEST).json(result);
    });
}

export default {
  scrapePublishers,
  scrapeContainers,
  scrapeContents
};
