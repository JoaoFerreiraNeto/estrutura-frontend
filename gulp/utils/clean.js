const del = require('del');
const log = require('./log');
const util = require('gulp-util');

function clean(path, done) {
    log(`Cleaning: ${util.colors.blue(path)}`);
    del(path, done);
}

module.exports = clean;