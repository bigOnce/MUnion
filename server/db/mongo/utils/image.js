import Thumb from "../models/thumb";
import urlUtil from "./urls";
import stringUtil from "./string";
import Constant from "../../../../constant";

var Jimp = require("jimp");
var Promise = require("promise");
var sizeOf = require("image-size");

export function formatImageFromUrl(src, type) {
  return new Promise(function(resolve, reject) {
    var thumb = null;
    if (src === undefined || !src.trim().length) {
      reject(thumb);
    } else {
      var hostName = urlUtil.getHostName(src);
      if (hostName !== undefined && hostName.trim().length) {
        const code = urlUtil.generalCodeForUrl(src);
        const img_name = hostName + "_" + code + ".jpg";
        const img_path = "./src/images/" + img_name;
        thumb = new Thumb({ src: src });
        thumb.path = img_path;

        Jimp.read(src, function(err, img) {
          if (err) throw err;

          // SCALE IMAGHE
          img.scaleToFit(180, Jimp.AUTO).write(img_path);

          // var w = img.bitmap.width; //  width of the image var h = img.bitmap.height;
          // // height of the image console.log(h + '    ' + w);
          resolve(img_path);
        });
      }
    }
  });
}

export function scaleAndCacheImageFromUrl(src, type, size) {
  return new Promise((resolve, reject) => {
    if (src === undefined || !src.trim().length) {
      reject("src is null !!!");
    } else {
      var hostName = urlUtil.getHostName(src);

      if (hostName !== undefined && hostName.trim().length) {
        const code = urlUtil.generalCodeForUrl(src);
        const imgName =
          hostName + "_" + code + "_" + type + "_" + size + ".jpg"; // NAME OF IMAGE
        const imgPath = "./src/images/" + imgName; // PATH OF IMAGE ON PROJECT
        const imgUrl = Constant.SRC_IMAGE_PATH + "/" + imgName; // URL IMAGE FOR CLIENT

        var thumb = new Thumb({ src: src });
        thumb.path = imgUrl;
        Jimp.read(src, function(err, img) {
          if (err) throw err;

          var w = img.bitmap.width; //  width of the image
          var h = img.bitmap.height; // height of the image
          // SCALE IMAGHE
          switch (type) {
            case Constant.IMG_SCALE_TYPE_WIDTH:
              {
                img.scaleToFit(size, Jimp.AUTO).write(imgPath);
                thumb.w = size;
                thumb.height = size / w * h;

                resolve(thumb);
              }
              break;
            case Constant.IMG_SCALE_TYPE_HEIGHT:
              {
                img.scaleToFit(Jimp.AUTO, size).write(imgPath);
                thumb.h = size;
                thumb.w = size / h * w;

                resolve(thumb);
              }
              break;
            default:
              reject("not found type!!!");
              break;
          }
        });
      } else {
        reject("Host name is not defined");
      }
    }
  });
}

export function sizeOfImageUrl(src) {
  return new Promise(function(resolve, reject) {
    if (src === undefined || !src.trim().length) {
      reject({ h: 0, w: 0 });
    } else {
      var hostName = urlUtil.getHostName(src);
      if (hostName !== undefined && hostName.trim().length) {
        Jimp.read(src, function(err, img) {
          if (err) throw err;
          if (img) {
            var w = img.bitmap.width; //  width of the image
            var h = img.bitmap.height; // height of the image
            resolve({ h: h, w: w });
          } else {
            reject({ h: 0, w: 0 });
          }
        });
      } else {
        reject({ h: 0, w: 0 });
      }
    }
  });
}

export default {
  formatImageFromUrl,
  sizeOfImageUrl,
  scaleAndCacheImageFromUrl
};
