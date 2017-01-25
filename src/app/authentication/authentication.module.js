import angular from 'angular';
import localStorage from 'angular-local-storage';
import authenticationRequestInterceptor from './configurations/authentication-request.interceptor';
import authenticationRoutes from './configurations/authentication.routes';
import localStoragePrefixConfig from './configurations/local-storage-prefix.config';
import routeStateChangeFilter from './configurations/route-state-change.filter';
import AuthenticationController from './controllers/authentication.controller';
import authenticationInterceptorFactory from './factories/authentication-interceptor.factory';
import authenticationService from './services/authentication.service';

const authenticationModule = angular.module('terraCloudApp.authentication', [localStorage])
    .config(authenticationRequestInterceptor)
    .config(authenticationRoutes)
    .config(localStoragePrefixConfig)
    .factory('authenticationInterceptorFactory', authenticationInterceptorFactory)
    .service('authenticationService', authenticationService)
    .controller('AuthenticationController', AuthenticationController)
    .run(routeStateChangeFilter);

export default authenticationModule.name;
