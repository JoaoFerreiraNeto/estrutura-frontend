/* @ngInject */
function localeIdentifier($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useStaticFilesLoader({
        prefix: './assets/locales/locale-',
        suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.preferredLanguage('en_US');
}

export default localeIdentifier;