import scrape from './scrape';
import Filters from '../models/filter';
import Constant from '../../../../constant';
import Publishers from '../models/publisher';
import Url from './url';
import StringUtils from './string';

var Jimp = require("jimp");
var Promise = require('promise');

export function publisher(publisher, domain) {

  return new Promise((resolve, reject) => {
    const {keywords, description, title, logo} = publisher;
    var hostName = Url.getHostName(domain);

    if (hostName.length) {
      Publishers.findOne({
        code: hostName
      }, (err, rs) => {
        if (err) {
          resolve(responseMsg('Publisher finde error with hostname ' + hostName));
        }

        if (!rs) {
          var newPublisher = new Publishers({code: hostName, type: Constant.PUBLISHER_CODE});

          if (keywords) {
            newPublisher.keywords = keywords;
          }

          if (title) {
            newPublisher.title = title;
          }

          // logo
          if (logo) {

            // Process image
            Jimp
              .read(logo, function (err, img) {
                if (err) 
                  throw err;
                
                const img_name = hostName + '_logo.jpg';
                const img_path = "./src/images/" + img_name;

                // scale image
                img
                  .resize(512, 512)
                  .quality(60)
                  .write(img_path);

                newPublisher
                  .thumbs
                  .push({
                    src: Constant.SRC_IMAGE_PATH + '/' + img_name
                  });

                //save in data
                newPublisher.save((err) => {
                  if (err) 
                    resolve(responseMsg('Publisher create error'));
                  else 
                    resolve(responseMsg('Publisher create success'));
                  }
                );

              });
            // end process image

          } else {

            // if !logo
            newPublisher.save((err) => {
              if (err) 
                resolve(responseMsg('Publisher create error'));
              else 
                resolve(responseMsg('Publisher create success'));
              }
            );

          }

        } else {
          // if found publisher for hoasname
          resolve(rs);
        }

      });

    } else {
      // hostname incorrect
      resolve(responseMsg('Domain incorrect !!!'));
    }

  });

}

export function catelogry(category, domain) {

  var hostName = Url.getHostName(domain);
  const {categories, sub_categories} = category;
  var isSubCategories = false;
  var listItems = [];
  console.log(categories);
  console.log(sub_categories);

  // set truong main categories
  if (categories.size) {
    console.log('aaaa');
    listItems = categories;
  }

  // set truong hop sub categorires
  if (sub_categories.size) {
    console.log('hahaha');
    listItems = sub_categories;
    isSubCategories = true;
  }
  console.log(listItems);
  if (hostName.length && listItems.size) {
    listItems.map((item, index) => {

      const {title, url} = item;
      if (title.length || url === "/") {
        console.log(item);
      } else {
        var newUrl = StringUtils.urlComplete(url, domain);
        console.log(newUrl);
      }

    })

    resolve(responseMsg('hahaha'));

  } else {

    // not found host name
    resolve(responseMsg('No hostname found!!!'));

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
  responseFail

};