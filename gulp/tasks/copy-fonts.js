'use strict';

const log = require('../utils/log');
const args = require('yargs').argv;
const config = require('../config');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function () {
        log('Copying fonts');

        const env = args.prod ? 'prod' : 'qa';

        return gulp.src(config.sources.dependencies.path + '/font-awesome/fonts/*')
            .pipe(gulp.dest(config[env].path + '/assets/fonts'));

    });
};
