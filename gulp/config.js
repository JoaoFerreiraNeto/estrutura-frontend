const mainJs = require('../package.json').main;
const prodPath = './build-prod';
const qaPath = './build-qa';
const sourcesPath = './src';
const tempPath = './.tmp';

module.exports = {
    prod: {
        files: {
            all: `${prodPath}/**/*`,
            css: `${prodPath}/assets/css/style.min.css`,
            html: {
                index: `${prodPath}/index.html`, 
                redirect: `${prodPath}/redirect.html`
            },
            js: 'app.min.js'
        },
        path: prodPath,
        libs: {path: `${prodPath}/libs`}
    },
    qa: {
        files: {
            all: `${qaPath}/**/*`,
            css: `${qaPath}/assets/css/style.css`,
            html: { 
                index: `${qaPath}/index.html`, 
                redirect: `${qaPath}/redirect.html` 
            },
            js: 'app.js'
        },
        path: qaPath,
        libs: {path: `${qaPath}/libs`}
    },
    sources: {
        files: {
            html: {
                index: `${sourcesPath}/index.html`,
                redirect: `${sourcesPath}/redirect.html`,
                templates: `${sourcesPath}/app/**/*.html`
            },
            js: {
                all: `${sourcesPath}/**/*.js`,
                entry: `.${mainJs}`
            },
            less: `${sourcesPath}/assets/less/**/*.less`,
            locales: `${sourcesPath}/assets/locales/**/*.json`
        },
        path: sourcesPath,
        dependencies: {path: './node_modules'}
    },
    temp: {
        templatesCache: `${tempPath}/templates.js`,
        path: tempPath
    },
    libs: [
        {
            name: 'angular-i18n'
        },
        {
            name: 'jquery',
            files: {
                prod: ['/dist/jquery.min.js'],
                qa: ['/dist/jquery.js']
            }
        },
        {
            name: 'bootstrap',
            files: {
                prod: ['/dist/css/bootstrap.min.css', '/dist/js/bootstrap.min.js'],
                qa: ['/dist/css/bootstrap.css', '/dist/js/bootstrap.js']
            }
        },
        {
            name: 'ng-dialog',
            files: {
                prod: ['/css/ngDialog.min.css'],
                qa: ['/css/ngDialog.css']
            }
        }
    ]
};
