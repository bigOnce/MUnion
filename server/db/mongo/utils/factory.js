import scrape from './scrape';
import Filters from '../models/filter';
import Catelogry from '../models/catelogry';
import Constant from '../../../../constant';
import Publishers from '../models/publisher';
import Url from './urls';
import StringUtils from './string';

var Jimp = require("jimp");
var Promise = require('promise');

export function publisher(publisher, domain) {
  return new Promise(function (resolve, reject) {

    // GET ALL OBJECT  OF PUBLISHER
    const {keywords, description, title, logo} = publisher;
    // GET HOSTNAME FROM DOMAIN
    var hostName = Url.getHostName(domain);
    // IF IS EXIST DOMAIN
    if (hostName.length) {

      Publishers.find({
        code: hostName
      }, (err, pub) => {

        if (err) {
          throw err;
        }

        if (pub === undefined || pub.length <= 0) {
          var newPublisher = new Publishers({code: hostName, type: Constant.PUBLISHER_CODE});
          // SET KEYWORDS
          if (keywords) {
            newPublisher.keywords = keywords;
          }
          // SET TITLE
          if (title) {
            newPublisher.title = title;
          }
          // SET LOGO
          if (logo) {

            // PROCESS LOGO IMAGE
            Jimp
              .read(logo, function (err, img) {
                if (err) 
                  throw err;
                
                const img_name = hostName + '_logo.jpg';
                const img_path = "./src/images/" + img_name;

                // SCALE IMAGHE
                img
                  .resize(512, 512)
                  .quality(60)
                  .write(img_path);

                newPublisher
                  .thumbs
                  .push({
                    src: Constant.SRC_IMAGE_PATH + '/' + img_name
                  });
                // SAVE TO DATABASE
                newPublisher.save((err) => {
                  if (err) 
                    throw err;
                  resolve(newPublisher);
                });
              });
            // END PROCESS IMAGE
          } else {

            // IF NOT ISEXIST LOGO - SAVE DATABASE
            newPublisher.save((err) => {
              if (err) 
                throw err;
              resolve(newPublisher);

            });

          }
        } else 
          resolve(pub);
        }
      );
    }
  });
}

// FACTORY CREATE CATELOGRY
export function catelogry(category, domain) {
  return new Promise(function (resolve, reject) {

    console.time("catelogry_db_save");
    var hostName = Url.getHostName(domain); // GET HOST NAME
    var {categories, sub_categories} = category; // GET CATELOGRY LIST AND SUBCATELOGRY LIST

    const returnCallback = ((resultList) => {
      resolve(resultList);
    });

    // IF IS EXIST HOSTNAME
    if (hostName.length) {
      //#################################
      //
      //          CATELOGRY
      //
      //#################################
      var catelogriesTempList = [];
      if (categories !== undefined && categories.length > 0) {
        const categoriesCount = categories.length - 1;
        categories.map((item, index) => {
          // GET TITLE - URL FROM ITEM
          const {title, url} = item;
          // CHECK TITLE AND URL FOR HOME PAGE
          if (url === "/" || url === undefined) {
            // PARSE HOME PAGE
            catelogrySave(domain, domain, 'Trang Chủ', index, Constant.CATEGORY_CODE).then((rs) => {
              catelogriesTempList.push(rs);
              if (index === categoriesCount) {
                returnCallback(catelogriesTempList);
              }
            }).catch((rs) => {
              catelogriesTempList.push(rs);
              if (index === categoriesCount) {
                returnCallback(catelogriesTempList);
              }
            });
          } else {
            // FOTMAR URL
            var newUrl = StringUtils.urlComplete(url, domain);
            // REMOVE CASE HOME PAGE
            if (newUrl !== domain) {
              // CREATE CATELOGRY WITH NEW URL
              catelogrySave(newUrl, domain, title, index, Constant.CATEGORY_CODE).then((rs) => {
                catelogriesTempList.push(rs);
                if (index === categoriesCount) {
                  returnCallback(catelogriesTempList);
                }
              }).catch((rs) => {
                catelogriesTempList.push(rs);
                if (index === categoriesCount) {
                  returnCallback(catelogriesTempList);
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
        var sub_catelogriesTempList = [];
        const subcategoriesCount = sub_categories.length - 1;
        sub_categories.map((item, index) => {
          const {title, url} = item;
          if (title.trim().length && url !== "/") {
            var newUrl = StringUtils.urlComplete(url, domain);
            // REMOVE CASE HOME PAGE
            if (newUrl !== domain) {
              // SUB CATELOGRY SAVEl
              catelogrySave(newUrl, domain, title, index, Constant.CATEGORY_CODE).then((rs) => {
                sub_catelogriesTempList.push(rs);
                if (index === subcategoriesCount) {
                  returnCallback(sub_catelogriesTempList);
                }
              }).catch((rs) => {
                sub_catelogriesTempList.push(rs);
                if (index === subcategoriesCount) {
                  returnCallback(sub_catelogriesTempList);
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
    } else 
      resolve(responseMsg('Host name not found')); // HOST NAME CAN NOT PARSE OR ERROR OR UNDEFINE
    console.timeEnd("catelogry_db_save"); // END TIME RUN FUNCTION
  });
}

// CATELOGRY SAVE DATABASE
export function catelogrySave(url, domain, title, index, type) {
  return new Promise(function (resolve, reject) {
    // CHECK IN DATABASE IS EXIST CATELOGRY WITH URL
    Catelogry.find({
      source: url // FIND A OBJECTIVE WITH URL
    }, (err, object) => {
      // SAVE DB ERROR
      if (err) 
        throw err;
      
      // IF IS  NOT EXIST CATELOGRY
      if (object === undefined || object.length <= 0) {
        // CREATE NEW CATELOGRY
        var newCatelogry = new Catelogry({source: url, type: type}); // INT CATELOGRY
        newCatelogry.domain = domain; // SET DOMAIN
        newCatelogry.title = title; // SET TITLE
        newCatelogry.code = 'C-' + index; // CREATE CODE INDEX
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
      message: '-E'
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
      message: '-F'
    };
}

export function categoryCreate() {}

export default {
  publisher,
  catelogry,
  responseMsg,
  responseError,
  responseFail,
  catelogrySave

};