'use strict';

const $ = require('gulp-load-plugins')({lazy: true});
const args = require('yargs').argv;
const config = require('../config');
const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, ['copy-locales', 'copy-libraries', 'compile-less', 'compress-images', 'compile-js'], function () {
        const env = args.prod ? 'prod' : 'qa';
        const isProduction = env === 'prod';
        const libs = [];

        log(`Creating index page for ${isProduction ? 'Production' : 'QA'} Environment`);
        config.libs
            .forEach(lib => {
                if (lib.files) lib.files[env]
                    .forEach(file => libs.push(`${config[env].libs.path}/${lib.name}${file}`));
            });
        libs.push(`${config[env].path}/${config[env].files.js}`);
        libs.push(config[env].files.css);

        return gulp.src(config.sources.files.html.index, {base: config.sources.path})
            .pipe($.inject(gulp.src(libs, {read: false}), {ignorePath: config[env].path.replace('./', '')}))
            .pipe($.if(isProduction, $.minifyHtml({empty: true})))
            .pipe(gulp.dest(config[env].path));
    });
};
