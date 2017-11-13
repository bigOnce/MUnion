import Filters from '../../models/filter'
import Constant from '../../../../../constant';
import urlUtil from '../../utils/urls';

export function setFilter(req, res) {

    var {
        rs,
        type,
        domain,
        name,
        url,
        filter
    } = req.body.set; // GET PARAMS IN REQUEST

    if (filter && type && domain) {
        
        var newFilter = {};
        domain = urlUtil.formatDomain(domain);

        // FIND FILTER FOR DOMAIN
        Filters.findOne({
            domain: domain
        }, function (err, object) {

            // THROW ERROR
            if (err) 
                throw err;
            
            // FIND FILLTER IN DB
            if (object) {

                var {publisher, categories, contents, containers} = object.filter;
                switch (type) {
                    case Constant.PUBLISHER_CODE:
                        {
                            if (publisher === undefined) {
                                publisher = {};
                            }
                            publisher.filter = filter;
                            publisher.url = url;
                            object.filter.publisher = publisher;
                        }
                        break;
                    case Constant.CATEGORY_CODE:
                        {
                            if (categories === undefined) {
                                categories = [];
                            }
                            filter.map((f_item, f_index) => {
                                var hasf_Item = categories.some((item) => {
                                    return item.fid === f_item.fid;
                                });

                                if (hasf_Item) {
                                    categories.map(item => {
                                        if (item.fid === f_item.fid) {
                                            item.filter = f_item.filter;
                                        }
                                    })
                                } else {
                                    categories.push(f_item);
                                }
                            });

                        }
                        break;
                    case Constant.ANCHOR_CODE:
                        {}
                        break;
                    case Constant.CONTAINERS_CODE:
                        {
                            containers = containers || {};
                            var {category} = filter;
                            if (category !== undefined) {
                                containers
                                    .category
                                    .push({url, filter: category});
                            }

                        }
                        break;
                    default:
                        break;
                }
                newFilter = object;
            } else {
                // NOT IS EXIST A FILTER WITH DOMAIN - CREATE NEW
                switch (type) {
                    case Constant.PUBLISHER_CODE:
                        {
                            newFilter = new Filters({
                                name,
                                domain,
                                filter: {
                                    publisher: {
                                        url: url,
                                        filter: filter
                                    }
                                },
                                type
                            });

                        }
                        break;

                    case Constant.CATEGORY_CODE:
                        {
                            newFilter = new Filters({
                                name,
                                domain,
                                filter: {
                                    categories: filter
                                },
                                type
                            });
                        }
                        break;
                    case Constant.CONTAINERS_CODE:
                        {
                            var {category} = filter;
                            newFilter = new Filters({
                                name,
                                domain,
                                filter: {
                                    containers: {
                                        category: category || {}
                                    }
                                },
                                type
                            });

                        }
                        break;
                    default:
                        break;
                }
            }

            newFilter.save((err, filterUpdate, numAffected) => {
                if (err) 
                    return handleError(err);
                res.send(filterUpdate);
            });
        })

    } else {

        res
            .status(Constant.ERROR_BAD_REQUEST)
            .send('Params {filter, type, domain} incorrect! Please check request');
    }
}

export default {
    setFilter
};
