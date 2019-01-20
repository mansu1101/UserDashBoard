(function () {
    'use strict';

    var app = angular.module('myApp.homeView', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
        function AuthenticateCb(AuthenticatorService) {
            return AuthenticatorService.isAuthenticated();
        }

        $routeProvider.when('/home', {
            templateUrl: 'homeView/home.html',
            title: "User Details",
            resolve: {
                authenticate: ['AuthenticatorService', AuthenticateCb]
            }
        });
        $routeProvider.when('/signUp', {
            title: "Signup",
            templateUrl: 'signUpView/registrationPage.html'
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
        $rootScope.viewDetailUp = false;

        $rootScope.isAdmin = function () {
            return $rootScope.token && $rootScope.token.role === "Admin";
        };

        $scope.isEditorRole = function () {
            if ($rootScope.token && $rootScope.token.role === "Editor") {
                $scope.user = {
                    username: $rootScope.token.userName,
                    mobile: $rootScope.token.mobile,
                    role: $rootScope.token.role
                };
                return true;
            }
            return false;
        };

        $scope.showUserDetail = function (item) {
            $log.info('Getting details of ');
            $rootScope.viewDetailUp = true;
            $scope.user = item;
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