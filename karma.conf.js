module.exports = function (config) {
    config.set({
        basePath: '',
        browserify: {
            debug: true,
            transform: [['babelify', {sourceMaps: true, presets: ['es2015']}], 'brfs']
        },
        frameworks: ['browserify', 'jasmine'],
        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            './src/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {'./src/**/*.spec.js': ['browserify']},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        // browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    });
};