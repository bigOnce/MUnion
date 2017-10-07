const PATHS = require('../paths');

module.exports = ({
    limit = 30000
} = {}) => ({test: /\.mp3$/, include: PATHS.src, loader: 'file-loader'});
