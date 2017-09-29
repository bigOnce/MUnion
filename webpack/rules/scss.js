const path = require('path');
const PATHS = require('../paths');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');


module.exports = () => ({
    test: /\.scss$/,
    use: [
        {
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        },{
            loader: "sass-loader" // compiles Sass to CSS
        }
    ],
    include: PATHS.app
});
