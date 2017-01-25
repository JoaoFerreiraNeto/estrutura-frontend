import angular from 'angular';
import 'ng-dialog';
import messagesDefaults from './configurations/messages.defaults';
import MessageController from './controllers/message.controller';
import messageFactory from './factories/message.factory';

const messagesModule = angular.module('terraCloudApp.messages', ['ngDialog'])
    .config(messagesDefaults)
    .controller('MessageController', MessageController)
    .factory('messageFactory', messageFactory);

export default messagesModule.name;