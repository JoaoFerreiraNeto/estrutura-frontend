'use strict';

const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');
const Server = require('karma').Server;

module.exports = function (gulp) {
    gulp.task(taskName, function (done) {
        log('Running specs');
        new Server({
            configFile: `${__dirname}/../../karma.conf.js`,
            singleRun: true
        }, done).start();
    });
};