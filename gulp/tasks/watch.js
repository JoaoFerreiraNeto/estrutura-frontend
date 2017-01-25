'use strict';

const config = require('../config');
const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function () {
        log('Watch Reload');

        gulp.watch(config.sources.files.js.all, ['compile-js']);
        gulp.watch(config.sources.files.less, ['compile-less']);
        gulp.watch(config.sources.files.html.templates, ['optimize-views']);
        gulp.watch(config.sources.files.html.index, ['create-index']);
        gulp.watch(config.sources.files.html.redirect, ['copy-redirect']);
        gulp.watch(config.sources.files.locales, ['copy-locales']);
    });
};
