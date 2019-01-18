(function () {
    'use strict';

    var app = angular.module('myApp.view3', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
        function AuthenticateCb(AuthenticatorService) {
            return AuthenticatorService.isAuthenticated();
        }

        $routeProvider.when('/home', {
            templateUrl: 'view3/home.html',
            resolve: {
                authenticate: ['AuthenticatorService', AuthenticateCb]
            }
        });
        $routeProvider.when('/signUp', {
            templateUrl: 'view2/registrationPage.html'
        });
    }]);

    /**
     * Login Controller to handle login and store the token after login.
     * @param $log
     * @param $scope
     * @param adminService call method like getToken/setToken
     * @param $rootScope
     * @param $window
     * @param $location
     * @param homeService call method like getUers/userByname/
     */
    function homeController($log, $scope, adminService, $rootScope, $window, $location, homeService) {
        $scope.viewDetailUp= false;
        $rootScope.isAdmin = function () {
            return $rootScope.token && $rootScope.token.role === "Admin";
        };
        $scope.isEditorRole = function () {
            return $rootScope.token && $rootScope.token.role === "Editor";
        };
        var dialogOptions = {
            templateUrl: 'popups/editPopup.html'
        };

        $scope.showUserDetail = function (item) {
            $log.info('Getting details of ');
            $scope.viewDetailUp = true;
            var itemToEdit = item;
        };

        //Onload function will load the data which are required at the time of controller loading
        function onLoad() {
            $rootScope.token = adminService.getToken();
            if ($rootScope.isAdmin()) {
                homeService.getUsers(null).then(function (response) {
                    $log.info('Users loaded successfully');
                    $scope.userData = response;
                }, function (err) {
                    $log.error('Error to load users', err);
                });
            }
            $log.info('onLoad : HomeController');
        }

        onLoad();
    }

    var require = [
        '$log',
        '$scope',
        'adminService',
        '$rootScope',
        '$window',
        '$location',
        'homeService',
        homeController
    ];
    app.controller('homeController', require);
}());