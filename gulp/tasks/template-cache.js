'use strict';

const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function () {
        log('Creating $templateCache from the HTML templates');
    });
};