/* @ngInject */
function localeIdentifier(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('./libs/angular-i18n/angular-locale_{{locale}}.js');
}

export default localeIdentifier;