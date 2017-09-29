import cheerio from 'cheerio';
import request from 'request';
import tinyreq from "tinyreq";
import scrapeIt from "scrape-it";

import * as stringUtil from '../utils/string';

export function parseUrl(url, callback) {
    if (url) {
        url = stringUtil.httpfactory(url);
        var webparse = {
            header: {},
            body: {}
        };
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html, {
                    withDomLvl1: true,
                    normalizeWhitespace: true,
                    xmlMode: true,
                    decodeEntities: true
                });

                $('head').each(function (i, element) {
                    var title = $('title').text();
                    var desc = $('meta[name=description]').attr('content');
                    var keywords = $('meta[name=keywords]').attr('content');
                    var fbappid = $('meta[property="fb:app_id"]').attr('content');
                    var link = $('link[rel="canonical"]').attr('href');

                    var header = {
                        title: title,
                        desc: desc,
                        keywords: keywords,
                        fbappid: fbappid,
                        link: link
                    }
                    webparse = {
                        header: header,
                        body: webparse.body
                    }

                });
                var body = [];
                var bodyItems = $('body')
                    .children()
                    .toArray();
                if (bodyItems.length) {
                    bodyItems.map((item) => {
                        var itemObject = {};
                        var tagname = $(item)
                            .get(0)
                            .tagName || $(item)
                            .get(0)
                            .name;
                        if (tagname !== "script" && tagname !== "noscript" && tagname !== "iframe") {
                            var tag_id = $(item).attr('id');
                            var tag_class = $(item).attr('class');
                            var tag_href = $(item).attr('href');
                            
                            var tagNode = function (item) {
                                var parseTag = function (tag) {
                                    var childList = $(tag)
                                        .children()
                                        .toArray();
                                    if (childList.length) {
                                        var childListObject = [];                                        
                                        childList.map((childItem) => {
                                            var child_tag_name = $(childItem)
                                                .get(0)
                                                .tagName || $(childItem)
                                                .get(0)
                                                .name;
                                            if (child_tag_name !== "script" && child_tag_name !== "noscript" && child_tag_name !== "iframe") {
                                                var child_node_tag_id = $(childItem).attr('id');
                                                var child_node_tag_class = $(childItem).attr('class');
                                                var child_node_tag_href = $(childItem).attr('href');
                                                var child_node_source =  $(childItem).attr('src');
                                                childListObject.push({
                                                    id: child_node_tag_id,
                                                    class: child_node_tag_class,
                                                    href: child_node_tag_href,
                                                    src: child_node_source,                                                    
                                                    [child_tag_name]: parseTag(childItem)
                                                })
                                            }

                                        });
                                        return childListObject;

                                    } else {
                                        var string = $(tag).text();
                                        return string;
                                    }
                                }

                                return parseTag(item);
                            }

                            itemObject = {
                                id: tag_id,
                                class: tag_class,
                                href: tag_href,
                                [tagname]: tagNode(item)
                            }
                            body.push(itemObject);
                        } else {
                        }


                       
                    });
                    webparse = {
                        header: webparse.header,
                        body: body
                    }
                }

            }

            callback(webparse);
        });

    }
}
