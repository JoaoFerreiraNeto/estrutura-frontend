/* @ngInject */
function localStoragePrefix(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('terraCloudApp');
}

export default localStoragePrefix;
