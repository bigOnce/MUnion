import scrape from "./scrape";
import Filters from "../models/filter";
import Constant from "../../../../constant";
import urlUtil from "./urls";
import imageUtil from "./image";
import stringUtil from "./string";
import Thumb from "../models/thumb";
import {
  Category,
  Publisher,
  NewsItem,
  Content,
  NewsNode
} from "../models/news";
import Promise from "promise";
var Jimp = require("jimp");

export function publisher(publisher, domain) {
  return new Promise(function(resolve, reject) {
    // GET ALL OBJECT  OF PUBLISHER FILTER
    const { keywords, description, title, logo } = publisher;

    // GET HOSTNAME FROM DOMAIN
    var hostName = urlUtil.getHostName(domain);

    // IF IS EXIST DOMAIN
    if (hostName !== undefined && hostName.length) {
      Publisher.find({ code: hostName }, (err, pub) => {
        if (err) throw err;

        const processPublisher = pub => {
          pub.save(err => {
            if (err) throw err;
            resolve(pub);
          });
        };

        // IF NOT FOUND OBJECT, SAVE PUBLISHER
        if (pub === undefined || pub.length <= 0) {
          var newPublisher = new Publisher({
            code: hostName,
            type: Constant.PUBLISHER_CODE
          });

          // SET KEYWORDS
          if (keywords) newPublisher.keywords = keywords;

          // SET TITLE
          if (title) newPublisher.title = title;

          // SET DOMAIN
          newPublisher.domain = domain;

          // SET LOGO
          if (logo) {
            imageUtil
              .scaleAndCacheImageFromUrl(
                logo,
                Constant.IMG_SCALE_TYPE_WIDTH,
                Constant.LOGO_WIDTH_SIZE
              )
              .then(thumb => {
                newPublisher.thumbs.push(thumb);
                processPublisher(newPublisher);
              });

            // END PROCESS IMAGE
          } else {
            // IF NOT ISEXIST LOGO - SAVE DATABASE
            processPublisher(newPublisher);
          }
        }
      });
    }
  });
}

// FACTORY CREATE CATELOGRY
export function category(category, domain) {
  return new Promise(function(resolve, reject) {
    console.time("catelogry_db_save");
    var hostName = urlUtil.getHostName(domain); // GET HOST NAME
    var { categories, sub_categories } = category; // GET CATELOGRY LIST AND SUBCATELOGRY LIST

    // FUNC RETURN
    const returnCallback = resultList => {
      resolve(resultList);
    };

    // IF IS EXIST HOSTNAME
    if (hostName.length) {
      Category.count({ domain: domain }, function(err, count) {
        //#################################
        //          CATELOGRY
        //#################################
        var categoriesTempList = [];
        if (categories !== undefined && categories.length > 0) {
          var categoriesCount = categories.length - 1;
          var newUrl = "";

          categories.map((item, index) => {
            // GET TITLE - URL FROM ITEM
            const { title, url } = item;

            // CHECK TITLE AND URL FOR HOME PAGE
            if (url === "/" || url === undefined) {
              // PARSE HOME PAGE
              catelogrySave(
                domain,
                domain,
                "Trang Chủ",
                index,
                Constant.CATEGORY_CODE,
                hostName
              )
                .then(rs => {
                  categoriesTempList.push(rs);
                  categoriesCount--;
                  if (0 === categoriesCount) {
                    returnCallback(categoriesTempList);
                  }
                })
                .catch(rs => {
                  categoriesTempList.push(rs);
                  categoriesCount--;
                  if (index === categoriesCount) {
                    returnCallback(categoriesTempList);
                  }
                });
            } else {
              // FOTMAR URL
              var newUrl = urlUtil.urlComplete(url, domain);

              // REMOVE CASE HOME PAGE
              if (newUrl !== domain) {
                // CREATE CATELOGRY WITH NEW URL
                catelogrySave(
                  newUrl,
                  domain,
                  title,
                  count + index,
                  Constant.CATEGORY_CODE,
                  hostName
                )
                  .then(rs => {
                    categoriesTempList.push(rs);
                    categoriesCount--;
                    if (0 === categoriesCount) {
                      returnCallback(categoriesTempList);
                    }
                  })
                  .catch(rs => {
                    categoriesTempList.push(rs);
                    categoriesCount--;
                    if (0 === categoriesCount) {
                      returnCallback(categoriesTempList);
                    }
                  });
              }
              // END (newUrl !== domain)
            }
            // END IF
          });

          // END CATELOGRY MAP ITEMS
        } // END CATELOGRIES

        // #################################
        //
        //          SUB CATELOGRY
        //
        // #################################

        if (sub_categories !== undefined && sub_categories.length > 0) {
          var sub_categoriesTempList = [];
          var subcategoriesCount = sub_categories.length - 1;
          sub_categories.map((item, index) => {
            const { title, url } = item;

            if (title !== undefined && url !== undefined) {
              var newUrl = urlUtil.urlComplete(url, domain);
              // REMOVE CASE HOME PAGE
              if (newUrl !== domain) {
                // SUB CATELOGRY SAVEl
                catelogrySave(
                  newUrl,
                  domain,
                  title,
                  count + index,
                  Constant.SUB_1_CATEGORY_CODE,
                  hostName
                )
                  .then(rs => {
                    sub_categoriesTempList.push(rs);
                    subcategoriesCount--;
                    if (0 === subcategoriesCount) {
                      returnCallback(sub_categoriesTempList);
                    }
                  })
                  .catch(rs => {
                    sub_categoriesTempList.push(rs);
                    subcategoriesCount--;
                    if (0 === subcategoriesCount) {
                      returnCallback(sub_categoriesTempList);
                    }
                  });
              }
              // END (newUrl !== domain)
            }
          }); // END SUBCATELOGRIES MAP ITEM
        } // END SUBCATELOGRY
        // #################################
        //
        //              EDN
        //
        // #################################
      });
    } else resolve(responseMsg("Host name not found")); // HOST NAME CAN NOT PARSE OR ERROR OR UNDEFINE
    console.timeEnd("catelogry_db_save"); // END TIME RUN FUNCTION
  });
}

// CATELOGRY SAVE DATABASE
export function catelogrySave(url, domain, title, index, type, hostname) {
  return new Promise(function(resolve, reject) {
    // CHECK IN DATABASE IS EXIST CATELOGRY WITH URL
    Category.find({ source: url }, (err, object) => {
      // SAVE DB ERROR
      if (err) throw err;

      // IF IS  NOT EXIST CATELOGRY
      if (object === undefined || object.length <= 0) {
        // CREATE NEW CATELOGRY
        var newCatelogry = new Category({ source: url, type: type }); // INT CATELOGRY
        newCatelogry.domain = domain; // SET DOMAIN
        newCatelogry.title = title; // SET TITLE
        newCatelogry.code = index; // CREATE CODE INDEX
        // SAVE CATELOGRY TO DATABASE
        newCatelogry.save((err, object) => {
          if (err) {
            throw err;
          } else {
            resolve(object);
          }
        });
      } else {
        resolve(object); // REJECT OBJECT BECAUSE HAD FOUND CATELOGRY #URL IN YOUR DATABASE
      }
      // END SAVE CATELOGRY
    });
    // END PROCESS
  });
}

// CATELOGRY CONTAINERS PARSE
export function containers(container, domain, categoryUrl) {
  return new Promise(function(resolve, reject) {
    if (
      container !== undefined &&
      domain !== undefined &&
      categoryUrl !== undefined
    ) {
      container.map((item, index) => {
        const {
          related,
          thumb_image,
          thumb_video,
          description,
          comment,
          url,
          title
        } = item;

        NewsItem.findOne(
          {
            source: url
          },
          (err, object) => {
            // ERROR
            if (err) throw err;
            // ISEXIST OBJECT WITH URL IN DB
            if (object) {
              resolve(object);
            } else {
              // NOT EXIST OBJECT WITH URL IN DB FUNCTION PROCESS NEWS ITEM
              const processNewsNode = item => {
                item.save((err, object) => {
                  if (err) {
                    throw err;
                  }
                  resolve(object);
                });
              };
              var newsItem = new NewsItem({ source: url });
              newsItem.title = title;
              newsItem.type = Constant.ANCHOR_CODE;
              newsItem.code = urlUtil.generalCodeForUrl(categoryUrl);
              newsItem.content = description;
              newsItem.comments = comment;
              newsItem.domain = domain;

              // THUMB IMAGE
              if (thumb_image !== undefined) {
                var imageUrl = thumb_image.src;
                var originalUrl = thumb_image.original;
                if (
                  originalUrl !== undefined &&
                  urlUtil.getHostName(thumb_image.original) !== undefined
                ) {
                  imageUrl = thumb_image.original;
                }
                var thumb = new Thumb({ src: imageUrl });
                thumb.description = thumb_image.description;
                imageUtil
                  .sizeOfImageUrl(imageUrl)
                  .then(res => {
                    thumb.w = res.w;
                    thumb.h = res.h;
                    newsItem.thumb = thumb.toJSON();
                    processNewsNode(newsItem);
                  })
                  .catch(res => {
                    thumb.w = res.w;
                    thumb.h = res.h;
                    newsItem.thumb = thumb.toJSON();
                    processNewsNode(newsItem);
                  });
              } else {
                processNewsNode(newsItem);
              }
            }
          }
        );
      });
    }
  });
}

export function contents(contents, domain, url) {
  // XU LI KHI CO NOI DUNG VE
  if (contents) {
    const {
      node,
      url,
      thumb_image,
      keywords,
      description,
      title,
      publisherTime
    } = contents;
    if (node !== undefined && node.length) {
      Content.find({ source: url }, (err, object) => {
        if (err) throw err;

        if (!object || !object.length) {
          var content = new Content({ sourceUrl: url, title: title });
          content.domain = domain;
          content.description = description;
          const nodeSize = node.length - 1;
          node.map((item, index) => {
            const { desc, image_url, str } = item;
            const funcSave = itemSave => {
              itemSave.save();
            };

            var newsnode = new NewsNode();
            newsnode.content = str;
            newsnode.index = index;
            var thumb = null;
            if (image_url) {
              thumb = new Thumb({ src: image_url });
              thumb.desc = desc;
              thumb.calcWidthHeight().then(thumbResult => {
                newsnode.thumbs.push(thumb);
                content.nodes.push(newsnode);
                if (nodeSize === index) {
                  funcSave(content);
                }
              });
            } else {
              content.nodes.push(newsnode);
              if (nodeSize === index) {
                funcSave(content);
              }
            }
          });
        }
      });
    }
  }
}

export function responseMsg(msg) {
  return msg
    ? {
        message: msg
      }
    : null;
}

export function responseError(msg) {
  return msg
    ? {
        message: msg,
        status: Constant.ERROR
      }
    : {
        status: Constant.ERROR,
        message: "-E"
      };
}

export function responseFail(msg) {
  return msg
    ? {
        message: msg,
        status: Constant.FAILED
      }
    : {
        status: Constant.FAILED,
        message: "-F"
      };
}

export function categoryCreate() {}

export default {
  publisher,
  category,
  responseMsg,
  responseError,
  responseFail,
  catelogrySave,
  containers,
  contents
};
