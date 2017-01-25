import angular from 'angular';
import 'angular-mocks';
import '../environment.module';

describe('terraCloudApp.environment', function () {
    const apiBaseURL = 'http://test/cloud';
    const fs = require('fs');
    let $controller;
    let $httpBackend;
    let $scope;
    let $timeout;

    beforeEach(angular.mock.module('terraCloudApp.environment'));

    beforeEach(angular.mock.module(function ($provide) {
        $provide.value('apiBaseURL', apiBaseURL);
    }));

    beforeEach(angular.mock.inject(function (_$controller_, _$httpBackend_, _$timeout_, $rootScope) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        $timeout = _$timeout_;
    }));

    // describe('EnvironmentCreationController', function () {
    //     it('should list all distributions, packages and customizations options', function () {
    //       $httpBackend.expectGET(`${apiBaseURL}/environments`)
    //           .respond(200, JSON.parse(fs.readFileSync(`${__dirname}/response-mocks/environments.json`, 'utf8')));
    //       $httpBackend.expectGET(`${apiBaseURL}/storages`)
    //           .respond(200, JSON.parse(fs.readFileSync(`${__dirname}/response-mocks/storages.json`, 'utf8')));
    //       $httpBackend.expectGET(`${apiBaseURL}/bandwidths`)
    //           .respond(200, JSON.parse(fs.readFileSync(`${__dirname}/response-mocks/bandwidths.json`, 'utf8')));
    //
    //         $controller('EnvironmentCreationController', {$scope: $scope});
    //         $timeout.flush();
    //         $httpBackend.flush();
    //
    //         expect($scope.environment.storages).toBeDefined();
    //         expect($scope.environment.bandwidths).toBeDefined();
    //     });
    // });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
