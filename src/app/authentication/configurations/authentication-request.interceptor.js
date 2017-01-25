/* @ngInject */
function authenticationRequestInterceptor($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptorFactory');
}

export default authenticationRequestInterceptor;
