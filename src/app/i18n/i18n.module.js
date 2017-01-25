import angular from 'angular';
import 'angular-dynamic-locale';
import 'angular-sanitize';
import 'angular-translate';
import 'angular-translate-handler-log';
import 'angular-translate-loader-static-files';
import localStorage from 'angular-local-storage';
import currentLocaleIdentifier from './configurations/current-locale.identifier';
import localeIdentifier from './configurations/locale.identifier';
import localeLoader from './configurations/locale.loader';
import i18nService from './services/i18n.service';

const i18nModule = angular.module('terraCloudApp.i18n', [
    localStorage,
    'ngSanitize',
    'pascalprecht.translate',
    'tmh.dynamicLocale'
])
    .config(localeIdentifier)
    .config(localeLoader)
    .service('i18nService', i18nService)
    .run(currentLocaleIdentifier);

export default i18nModule.name;
