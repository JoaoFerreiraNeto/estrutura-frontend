import _ from 'lodash';

/* @ngInject */
function i18nService($q, $http) {
    const self = this;
    const fs = require('fs');

    /* public functions */
    self.identifyLocale = identifyLocale;

    ////////////

    function getLocale(country) {
        const locales = getLocales();
        const localeIndex = _.findIndex(locales, locale => locale.indexOf(country) !== -1);
        return locales[localeIndex].replace('locale-', '').replace('.json', '');
    }

    function getLocales() {
        return fs.readdirSync('src/assets/locales');
    }

    function identifyLocale() {
        const deferred = $q.defer();
        $http.get('https://ipinfo.io/').then(
            response => deferred.resolve(getLocale(response.data.country)),
            error => deferred.resolve(error)
        );
        return deferred.promise;
    }
}

export default i18nService;
