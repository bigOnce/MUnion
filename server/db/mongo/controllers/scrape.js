import * as scrape from '../utils/scrape';

/**
 * scrape url with htmltag{class, id}
 * @param {url, filter} req
 * @param {url, data} res
 */
export function scrapeWithFilter(req, res) {
    var filter = req.body.filter;
    const url = req.body.url;

    filter = {
        title: 'head title',
        description: {
            selector: 'head meta[name=description]',
            attr: 'content'
        },
        menu: {
            listItem: 'nav[id=main_menu] a',
            data: {
                title: {
                    attr: "title"
                },
                url: {
                    attr: 'href'
                }
            }
        }
    }

    if (url && filter) {
        scrape.scrape(url, filter, () => {});
        res
            .status(200)
            .send('successed');
    } else 
        res
            .status(500)
            .send('error');
    }

export default {
    scrapeWithFilter
};
