'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
    'ngHttpStatus',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3',
    'myApp.version',

]).config(['$locationProvider', '$routeProvider','$httpProvider', function ($locationProvider, $routeProvider,$httpProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});
    $httpProvider.interceptors.push('apiInterceptorService');
}]);

function appController($scope, $rootScope, AuthService, NavigationPath, $location) {
    $scope.logout = function () {
        AuthService.destroyAuth();
    };
    $scope.signUp = function () {
        $location.path(NavigationPath.REGISITOR);
    };
    $rootScope.NavigationPath = NavigationPath;
}
var require = [
    '$scope',
    '$rootScope',
    'AuthenticatorService',
    'NavigationPath',
    '$location',
    appController
];
app.controller('appController', require);
