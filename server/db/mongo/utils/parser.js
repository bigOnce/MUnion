import cheerio from 'cheerio';
import request from 'request';
import tinyreq from 'tinyreq';
import scrapeIt from 'scrape-it';
import string from './string';

export function parseUrl(url, callback) {
    if (url) {
        url = string.httpfactory(url);
        
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
                    const title = {
                        filter: 'head title',
                        content: $('title').text()
                    };
                    const description = {
                        filter: 'meta[name="description"]',
                        attr: 'content',
                        content: $('meta[name="description"]').attr('content')
                    };
                    const keywords = {
                        filter: 'meta[name="keywords"]',
                        attr: 'content',
                        content: $('meta[name="keywords"]').attr('content')
                    };
                    const fbappid = {
                        filter: 'meta[property="fb:app_id"]',
                        attr: 'content',
                        content: $('meta[property="fb:app_id"]').attr('content')
                    };
                    const link = {
                        filter: 'link[rel="canonical"]',
                        attr: 'href',
                        href: $('link[rel="canonical"]').attr('href')
                    };

                    const logo = {
                        filter: 'meta[property="og:image"]',
                        attr: 'content',
                        content: $('meta[property="og:image"]').attr('content')
                    };

                    const copyright = {
                        filter: 'meta[name="copyright"]',
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

                // define parse node item
                const parseNodeDetail = function (tag_name, nodeItem, index) {
                    if (tag_name !== 'script' && tag_name !== 'noscript' && tag_name !== 'iframe') {

                        const child_node_tag_id = $(nodeItem).attr('id');
                        const child_node_tag_class = $(nodeItem).attr('class');
                        const child_node_tag_href = $(nodeItem).attr('href');
                        const child_node_source = $(nodeItem).attr('src');
                        const child_node_name = $(nodeItem).attr('name');

       
                        return "<" + [tag_name] + ((child_node_tag_id) ? (" id=\"" + [child_node_tag_id]) + "\"" : "") + ((child_node_tag_class) ? (" class=\"" + [child_node_tag_class] + "\"") : "") + ((child_node_tag_href) ? (" href=\"" + [child_node_tag_href] + "\"") : "") + ((child_node_name) ? (" name=\"" + [child_node_name] + "\"") : "") + ((child_node_source) ? (" src=\"" + [child_node_source] + "\"") : "") + " >" + "      " + index ;
                    }
                }

                const getTagName = function (nodeItem) {
                    return $(nodeItem)
                    .get(0)
                    .tagName || $(nodeItem)
                    .get(0)
                    .name;
                }
                
                const body = {};
                const bodyItems = $('body')
                    .children()
                    .toArray();

                if (bodyItems.length > 0) {
                    bodyItems.map((item, index) => {
                        
                        const tagname = $(item)
                            .get(0)
                            .tagName || $(item)
                            .get(0)
                            .name;

                        if (tagname !== 'script' && tagname !== 'noscript' && tagname !== 'iframe') {
                            const tag_id = $(item).attr('id');
                            const tag_href = $(item).attr('href');
                            const tag_class = $(item).attr('class');

                            const tagNode = function (item) {

                                const parseTag = function (tag_node) {

                                    var childListObject = {};                                    
                                    const childList = $(tag_node)
                                        .children()
                                        .toArray();


                                    if (childList.length > 0) {
                                        
                                        childList.map((childItem, idx) => {
                                            
                                            const tag_name = getTagName(childItem);
                                            const tag_key = parseNodeDetail(tag_name, childItem, idx);
                                            if (tag_key !== undefined) {
                                                childListObject[tag_key] = parseTag(childItem);                                                
                                            }

                                           
                                        });

                                        return childListObject;

                                    } else {

                                        return $(tag_node).text();                                            
                                    }
                                };

                                return parseTag(item);
                            };

                            var tagkey = "<" + [tagname] + ((tag_id) ? (" id=\"" + [tag_id]) + "\"" : "") + ((tag_class) ? (" class=\"" + [tag_class] + "\"") : "") + ((tag_href) ? (" href=\"" + [tag_href] + "\"") : "") + " >" + "        " + index ;
                            body[tagkey] = tagNode(item);

                        }
                    });
                    webparse = {
                        head: webparse.head,
                        body
                    };
                } else {

                }
            }
            callback(webparse);
        });
    }
}

 export default {
    parseUrl
 };