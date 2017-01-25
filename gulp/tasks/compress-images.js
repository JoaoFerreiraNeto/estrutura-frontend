'use strict';

const $ = require('gulp-load-plugins')({lazy: true});
const config = require('../config');
const args = require('yargs').argv;
const log = require('../utils/log');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function () {

      const env = args.prod ? 'prod' : 'qa';
      const isProduction = env === 'prod';

      log(`Compressing and copying images ${isProduction ? 'Production' : 'QA'} Environment`);

      var images_dir = '/assets/images';

      return gulp
          .src(config.sources.path + images_dir + '/*')
          .pipe($.if(isProduction, $.imagemin({optimizationLevel: 4})) )
          .pipe($.if(isProduction, gulp.dest(config.prod.path + images_dir)) )
          .pipe(gulp.dest(config.qa.path + images_dir));


    });
};
