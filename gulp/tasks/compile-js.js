'use strict';

const $ = require('gulp-load-plugins')({lazy: true});
const args = require('yargs').argv;
const babelify = require('babelify');
const brfs = require('brfs');
const browserify = require('browserify');
const envify = require('envify/custom');
const buffer = require('vinyl-buffer');
const config = require('../config');
const del = require('del');
const log = require('../utils/log');
const main = require('../../package.json').main;
const source = require('vinyl-source-stream');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function () {
        const env = args.prod ? 'prod' : 'qa';
        const isProduction = env === 'prod';

        log(`Building application for ${isProduction ? 'Production' : 'QA'} Environment`);
        return browserify({
            debug: !isProduction,
            transform: [
                ['babelify', {compact: false, sourceMaps: !isProduction, presets: ['es2015']}],
                'brfs',
                'browserify-ngannotate',
                ['envify',{NODE_ENV:env}]
            ]
        })
            .require([
                isProduction ? config.temp.templatesCache : main,
                './node_modules/babel-polyfill/dist/polyfill.min.js'],
                {entry: true})
            .bundle()
            .pipe(source(config[env].files.js))
            .pipe($.if(isProduction, buffer()))
            .pipe($.if(isProduction, $.uglify()))
            .pipe(gulp.dest(config[env].path));
    });
};
