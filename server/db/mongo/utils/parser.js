import cheerio from 'cheerio';
import request from 'request';
import tinyreq from 'tinyreq';
import scrapeIt from 'scrape-it';

import * as stringUtil from '../utils/string';

export function parseUrl(url, callback) {
    if (url) {
        url = stringUtil.httpfactory(url);
        let webparse = {
            header: {},
            body: {}
        };
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html, {
                    withDomLvl1: true,
                    normalizeWhitespace: true,
                    xmlMode: true,
                    decodeEntities: true
                });

                $('head').each((i, element) => {
                    const title = $('title').text();
                    const desc = $('meta[name=description]').attr('content');
                    const keywords = $('meta[name=keywords]').attr('content');
                    const fbappid = $('meta[property="fb:app_id"]').attr('content');
                    const link = $('link[rel="canonical"]').attr('href');

                    const header = {
                        title,
                        desc,
                        keywords,
                        fbappid,
                        link
                    };
                    webparse = {
                        header,
                        body: webparse.body
                    };
                });
                const body = [];
                const bodyItems = $('body')
                    .children()
                    .toArray();
                if (bodyItems.length) {
                    bodyItems.map((item) => {
                        let itemObject = {};
                        const tagname = $(item)
                            .get(0)
                            .tagName || $(item)
                            .get(0)
                            .name;
                        if (tagname !== 'script' && tagname !== 'noscript' && tagname !== 'iframe') {
                            const tag_id = $(item).attr('id');
                            const tag_class = $(item).attr('class');
                            const tag_href = $(item).attr('href');

                            const tagNode = function (item) {
                                var parseTag = function (tag) {
                                    const childList = $(tag)
                                        .children()
                                        .toArray();
                                    if (childList.length) {
                                        const childListObject = [];
                                        childList.map((childItem) => {
                                            const child_tag_name = $(childItem)
                                                .get(0)
                                                .tagName || $(childItem)
                                                .get(0)
                                                .name;
                                            if (child_tag_name !== 'script' && child_tag_name !== 'noscript' && child_tag_name !== 'iframe') {
                                                const child_node_tag_id = $(childItem).attr('id');
                                                const child_node_tag_class = $(childItem).attr('class');
                                                const child_node_tag_href = $(childItem).attr('href');
                                                const child_node_source = $(childItem).attr('src');
                                                childListObject.push({
                                                    id: child_node_tag_id,
                                                    class: child_node_tag_class,
                                                    href: child_node_tag_href,
                                                    src: child_node_source,
                                                    [child_tag_name]: parseTag(childItem)
                                                });
                                            }
                                        });
                                        return childListObject;
                                    }
                                        const string = $(tag).text();
                                        return string;
                                };

                                return parseTag(item);
                            };

                            itemObject = {
                                id: tag_id,
                                class: tag_class,
                                href: tag_href,
                                [tagname]: tagNode(item)
                            };
                            body.push(itemObject);
                        } else {
                        }
                    });
                    webparse = {
                        header: webparse.header,
                        body
                    };
                }
            }

            callback(webparse);
        });
    }
}
