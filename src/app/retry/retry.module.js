import angular from 'angular';
import 'ng-dialog';
import RetryMessageController from './controllers/retry-message.controller';
import attemptFactory from './factories/attempt.factory';

const retryModule = angular.module('terraCloudApp.retry', ['ngDialog'])
    .controller('RetryMessageController', RetryMessageController)
    .factory('attemptFactory', attemptFactory);

export default retryModule.name;