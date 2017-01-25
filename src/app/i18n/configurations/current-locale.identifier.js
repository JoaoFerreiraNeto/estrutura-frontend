/* @ngInject */
function currentLocaleIdentifier(i18nService, $translate, localStorageService, tmhDynamicLocale, $rootScope) {
    const currentLocale = localStorageService.get('locale');

    if (currentLocale) {
        $translate.use(currentLocale);
    } else {
        i18nService.identifyLocale().then(saveAndUseLocale);
    }

    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
    });

    ////////////

    function saveAndUseLocale(locale) {
        if (locale) {
            $translate.use(locale);
            localStorageService.set('locale', locale);
        }
    }
}

export default currentLocaleIdentifier;