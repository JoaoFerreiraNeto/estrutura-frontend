'use strict';

const $ = require('gulp-load-plugins')({lazy: true});
const config = require('../config');
const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function () {
        log('Analyzing source with JSHint');
        return gulp
            .src(config.sources.files.js.all)
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe($.jshint.reporter('fail'))
            .pipe($.jscs());
    });
};