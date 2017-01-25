import angular from 'angular';
import 'angular-mocks';
import '../home.module';


describe('terraCloudApp.home', () => {
    const apiBaseURL = 'http://test/cloud';
    const fs = require('fs');
    let $controller;
    let $localStorageService;

    beforeEach(angular.mock.module('terraCloudApp.home'));

    beforeEach(angular.mock.module(function ($provide) {
        $provide.value('apiBaseURL', apiBaseURL);
    }));

    beforeEach(angular.mock.inject(function (_$controller_, _localStorageService_) {
       $controller = _$controller_;
       $localStorageService = _localStorageService_;

        $localStorageService.set('token', 'uvdouhdobidhbodibdoihdviduhdb');
        $localStorageService.set('user', 'oudhpdod');

    }));

    describe('HomeAuthenticationController', function () {
        it('I try to logout', function () {
            const controller = $controller('HomeAuthenticationController');

            expect($localStorageService.get('token')).not.toBeNull();
            expect($localStorageService.get('user')).not.toBeNull();

            controller.logout();

            expect($localStorageService.get('token')).toBeNull();
            expect($localStorageService.get('user')).toBeNull();

        });
    });

  });
