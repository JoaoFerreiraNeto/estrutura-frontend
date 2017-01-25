'use strict';

const log = require('../utils/log');
const args = require('yargs').argv;
const config = require('../config');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function () {
        log('Copying locales');

        const env = args.prod ? 'prod' : 'qa';

        return gulp.src(config.sources.files.locales, {base: config.sources.path})
            .pipe(gulp.dest(config[env].path));
    });
};
