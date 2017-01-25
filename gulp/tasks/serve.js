'use strict';

const taskName = require('path').basename(__filename).replace('.js', '');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const config = require('../config');

module.exports = function (gulp) {
    gulp.task(taskName, ['build', 'watch'], function () {
        browserSync.init({port: 4000, server: {baseDir: './build-qa/'}});
        gulp.watch(config.qa.files.all).on('change', reload);
    });
};
