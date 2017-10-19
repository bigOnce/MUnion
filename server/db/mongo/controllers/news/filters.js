import Filters from '../../models/filter'
import Constant from '../../../../../constant';

export function setFilter(req, res) {

    const {filter, type, domain, name, url} = req.body.set;
    if (filter && type && domain) {
        var newFilter = {};
        Filters.findOne({
            domain: domain
        }, function (err, rs) {
            if (err) 
                return handleError(err);
            if (rs) {
                switch (type) {
                    case Constant.PUBLISHER_CODE:
                        {
                            rs.filter.publisher.filter = filter;
                            rs.filter.publisher.url = url;
                        }
                        break;

                    case Constant.CATEGORY_CODE:
                        {
                            const listCatelogries = rs.filter.catelogries;
                            filter.map((f_item, f_index) => {
                                isUpdate = false;                                
                                var hasf_Item = listCatelogries.some((item) => { 
                                    return item.fid === f_item.fid;
                                });

                                if (hasf_Item) {
                                    listCatelogries.map(item => {
                                        if (item.fid === f_item.fid) {
                                            item.filter = f_item;
                                        }
                                    })
                                } else {
                                    listCatelogries.push(f_item);
                                }
                            });

                        }
                        break;
                        case Constant.ANCHOR_CODE : {
                            var isUpdate = false;
                            const listContents = rs.filter.contents;
                            listContents.map((item, index) => {
                                if (item.url === url) {
                                    item.filter = filter;
                                    isUpdate = true;
                                }
                            });
                            if (!isUpdate) {
                                listContents.push({url: url, filter: filter});
                            }
                        }
                        break;
                        default : break;}
                    newFilter = rs;
                } else {
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
                                        catelogries: filter
                                    },
                                    type
                                });

                            }
                            break;
                        case Constant.ANCHOR_CODE:
                            {
                                newFilter = new Filters({
                                    name,
                                    domain,
                                    filter: {
                                        contents: filter
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
            .send('Params in correct!');
    }
}

export default {
    setFilter
};
