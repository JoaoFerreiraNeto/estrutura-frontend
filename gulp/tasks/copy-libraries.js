'use strict';

const $ = require('gulp-load-plugins')({lazy: true});
const args = require('yargs').argv;
const config = require('../config');
const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function () {
        const env = args.prod ? 'prod' : 'qa';
        const isProduction = env === 'prod';

        log(`Copying front-end libraries to ${isProduction ? 'Production' : 'QA'} Environment`);
        const libsPaths = config.libs.map(lib => `${config.sources.dependencies.path}/${lib.name}/**/*`);
        return gulp.src(libsPaths, {base: config.sources.dependencies.path})
            .pipe(gulp.dest(config[env].libs.path));
    });
};