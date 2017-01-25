'use strict';

const $ = require('gulp-load-plugins')({lazy: true});
const args = require('yargs').argv;
const config = require('../config');
const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');
const TEMPLATE_HEADER = 'import angular from "angular";'
    + `import mainModule from ".${require('../../package.json').main}";`
    + 'export default angular.module(mainModule).run(["$templateCache",function($templateCache){';
const TEMPLATE_OPTIONS = {
    templateHeader: TEMPLATE_HEADER,
    transformUrl: url => `./app/${url.split('/terra-cloud-ui/src/app/')[1]}`
};

module.exports = function (gulp) {
    gulp.task(taskName, function () {
        const env = args.prod ? 'prod' : 'qa';
        const isProduction = env === 'prod';

        log(`Optimizing templates to ${isProduction ? 'Production' : 'QA'} Environment`);
        return gulp.src(config.sources.files.html.templates, {base: config.sources.path})
            .pipe($.if(isProduction, $.minifyHtml({empty: true})))
            .pipe($.if(isProduction, $.angularTemplatecache(TEMPLATE_OPTIONS)))
            .pipe($.if(isProduction, gulp.dest(config.temp.path), gulp.dest(config.qa.path)));
    });
};