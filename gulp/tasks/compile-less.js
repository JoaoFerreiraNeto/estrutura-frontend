'use strict';

const $ = require('gulp-load-plugins')({lazy: true});
const args = require('yargs').argv;
const config = require('../config');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ie 10', 'opera 12.1', 'ios 6', 'android 4']});
const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, ['copy-fonts'], function () {
        const env = args.prod ? 'prod' : 'qa';
        const isProduction = env === 'prod';

        log('Compiling Less to CSS');
        return gulp.src(config.sources.files.less)
            .pipe($.less({
                plugins: [autoprefix],
                paths: [
                    config.sources.dependencies.path + '/bootstrap-less'
                ]
            }).on('error', $.util.log))
            .pipe($.if(isProduction, $.concat('style.min.css')))
            .pipe($.if(isProduction, $.stripCssComments({all: true})))
            .pipe($.if(isProduction, $.cssmin()))
            .pipe(gulp.dest(config[env].path + '/assets/css/'));
    });
};
