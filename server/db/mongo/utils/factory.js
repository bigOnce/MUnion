import scrape from './scrape';
import Filters from '../models/filter';
import Constant from '../../../../constant';
import Publishers from '../models/publisher';
import Url from './url';

var Jimp = require("jimp");
var Promise = require('promise');

export function publisher(publisher, domain) {

  return new Promise((resolve, reject) => {
    const {keywords, description, title, logo} = publisher;
    var hostName = Url.getHostName(domain);

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

    } else {
      resolve(responseMsg('Publisher create success'));
    }

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
  responseMsg,
  responseError,
  responseFail

};