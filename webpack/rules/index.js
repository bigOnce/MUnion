const image = require('./image');
const javascript = require('./javascript');
const css = require('./css');
const scss = require('./scss');
const mp3 = require('./sound');

module.exports = ({
  production = false,
  browser = false
} = {}) => ([
  javascript({production, browser}),
  css({production, browser}),
  image(),
  scss(),
  mp3()
]);
