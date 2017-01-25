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

    beforeEach(angular.mock.inject(function (_$controller_, _$httpBackend_, $rootScope, _$timeout_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        $timeout = _$timeout_;
    }));

    describe('EnvironmentListController', function () {
        it('should list all user environments', function () {
            $httpBackend.expectGET(`${apiBaseURL}/environments`)
                .respond(200, JSON.parse(fs.readFileSync(`${__dirname}/response-mocks/environments.json`, 'utf8')));

            const controller = $controller('EnvironmentListController', {$scope});
            $timeout.flush();
            $httpBackend.flush();

            expect(controller.environments).toBeDefined();
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
