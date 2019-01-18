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
     * @param $scope
     * @param loginService
     * @param $window
     */
    function homeController($log, $scope, $dialog, adminService, $rootScope, $window, $location, homeService) {
        $scope.userData;
        $rootScope.isAdmin = function () {
            return $rootScope.token.role === "Admin";
        };
        $scope.isEditorRole = function () {
            return $rootScope.token.role === "Editor";
        };
        var dialogOptions = {
            templateUrl: 'popups/editPopup.html'
        };
        $scope.showUserDetail = function (item) {
            $log.info('Getting details of ');
            var itemToEdit = item;
            $dialog.dialog(angular.extend(dialogOptions, {resolve: {item: angular.copy(itemToEdit)}}))
                .open()
                .then(function (result) {
                    $log.info('Edit user popup opened', result);
                    if (result) {
                        $log.info('Edit user popup opened');
                        angular.copy(result, itemToEdit);
                    }
                    itemToEdit = undefined;
                });
        };

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
        '$dialog',
        'adminService',
        '$rootScope',
        '$window',
        '$location',
        'homeService',
        homeController
    ];
    app.controller('homeController', require);
}());