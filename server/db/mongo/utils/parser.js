import cheerio from 'cheerio';
import request from 'request';
import tinyreq from 'tinyreq';
import scrapeIt from 'scrape-it';

import * as stringUtil from '../utils/string';

export function parseUrl(url, callback) {
    if (url) {
        url = stringUtil.httpfactory(url);
        let webparse = {
            head: {},
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
                    const description = {
                        tag: 'meta',
                        name: 'description',
                        attr: 'content',
                        content: $('meta[name="description"]').attr('content')
                    };
                    const keywords = {
                        tag: 'meta',
                        name: 'keywords',
                        attr: 'content',
                        content: $('meta[name="keywords"]').attr('content')
                    };
                    const fbappid = {
                        tag: 'meta',
                        property: 'fb:app_id',
                        attr: 'content',
                        content: $('meta[property="fb:app_id"]').attr('content')
                    };
                    const link = {
                        tag: 'link',
                        rel: 'canonical',
                        attr: 'href',
                        href: $('link[rel="canonical"]').attr('href')
                    };

                    const logo = {
                        tag: 'meta',
                        property: 'og:image',
                        attr: 'content',
                        content: $('meta[property="og:image"]').attr('content')
                    };

                    const copyright = {
                        tag: 'meta',
                        name: 'copyright',
                        attr: 'content',
                        content: $('meta[name="copyright"]').attr('content')
                    }

                    const head = {
                        title,
                        description,
                        keywords,
                        fbappid,
                        link,
                        logo,
                        copyright
                    }

                    webparse = {
                        head,
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
                                                const child_node_name = $(childItem).attr('name');

                                                childListObject.push({
                                                    id: child_node_tag_id,
                                                    class: child_node_tag_class,
                                                    href: child_node_tag_href,
                                                    src: child_node_source,
                                                    name: child_node_name,
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
                        } else {}
                    });
                    webparse = {
                        head: webparse.head,
                        body
                    };
                }
            }

            callback(webparse);
        });
    }
}
