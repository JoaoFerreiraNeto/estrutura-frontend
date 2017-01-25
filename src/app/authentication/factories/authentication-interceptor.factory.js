import angular from 'angular';

/* @ngInject */
function authenticationInterceptorFactory($location, $q, apiBaseURL, localStorageService) {
    const authenticationInterceptor = {
        request: request,
        responseError: responseError
    };

    return authenticationInterceptor;

    ////////////

    function request(config) {
        const token = localStorageService.get('token');
        if (config.url.startsWith(apiBaseURL) && angular.isDefined(token) && token !== null) {
            config.headers.Authorization = token;
        }
        return config;
    }

    function responseError(response) {
        if (response.config.url.startsWith(apiBaseURL) && response.status === 401 || response.status === 403) {
            localStorageService.remove('token');
            localStorageService.remove('user');
            $location.path('/login');
        }
        return $q.reject(response);
    }
}

export default authenticationInterceptorFactory;
