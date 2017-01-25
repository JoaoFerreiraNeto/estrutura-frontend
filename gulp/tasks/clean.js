'use strict';

const config = require('../config');
const clean = require('../utils/clean');
const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function (done) {
        log('Removing all files from the build');
        clean([config.prod.files.all, config.qa.files.all], done);
    });
};