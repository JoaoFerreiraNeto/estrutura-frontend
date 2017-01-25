'use strict';

const config = require('../config');
const clean = require('../utils/clean');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function (done) {
        clean(config.temp.path, done); // TODO: Verify problem with deletion on Mac OS
    });
};