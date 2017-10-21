// freeze to prevent user change value
module.exports = Object.freeze({
  // Key
  kSource: 'src',
  kHeight: 'h',
  kWidth: 'w',
  kType: 'type',
  kContent: 'content',
  kCaption: 'caption',
  kThumb: 'thumb',
  kTitle: 'title',

  // CODE
  TEXT_CODE: 1,
  IMAGE_CODE: 2,
  VIDEO_CODE: 31,
  AUDIO_CODE: 32,
  PUBLISHER_CODE: 10,
  CATEGORY_CODE: 11,
  TOPIC_CODE: 12,
  ANCHOR_CODE: 20,
  ARTICLE_CODE: 30,
  NAVIGATOR_MENU_CODE: 50,
  NAVIGATOR_NEXT_CODE: 51,
  NAVIGATOR_PREV_CODE: 52,

  SUCCESS: 1,
  FAILED: 0,
  // ERROR CODE
  RESPONSE_SUCCESS: 200,
  
  ERROR: -1,
  ERROR_BAD_REQUEST: 400,
  ERROR_UNAUTHORIZED: 401,
  ERROR_PAYMENT_REQUIRED: 402,
  ERROR_FORBIDDEN: 403,
  ERROR_NOT_FOUND: 404,
  ERROR_METHOD_NOT_ALLOWED: 405,
  ERROR_NOT_ACCEPTABLE: 405,
  ERROR_REQUEST_TIME_OUT: 408,
  ERROR_BAD_GATEWAY: 502,


  // Define APPS Id
  NEWS_APP_ID: 'vinabao',


  // Category ID
  CATEGORY_MAIN_ID: 'categories',
  CATEGORY_SUB_1_ID: 'sub_categories',
  CATEGORY_SUB_2_ID: 'sub_categories_2',
  
  // API PATHS
  SRC_IMAGE_PATH: '/src/images',
  SRC_AUDIO_PATH: '/src/mp3'
  

});
