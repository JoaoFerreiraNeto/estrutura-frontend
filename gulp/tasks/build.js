'use strict';

const run = require('run-sequence');
const taskName = require('path').basename(__filename).replace('.js', '');

module.exports = function (gulp) {
    gulp.task(taskName, function (done) {
        run('optimize-views',
            [
                'copy-locales',
                'copy-libraries',
                'compile-less',
                'compress-images',
                'compile-js',
                'copy-redirect',
                'create-index'
            ],
            done);
    });
};
