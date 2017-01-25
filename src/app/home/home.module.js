import angular from 'angular';
import 'angular-ui-router';
import homeRoutes from './configurations/home.routes';
import HomeAuthenticationController from './controllers/home-authentication.controller';
import authenticationModule from '../authentication/authentication.module';


const homeModule = angular.module('terraCloudApp.home', ['ui.router', authenticationModule])
    .config(homeRoutes)
    .controller('HomeAuthenticationController', HomeAuthenticationController);

export default homeModule.name;
