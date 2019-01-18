(function () {
    'use strict';

    var app = angular.module('myApp.view2', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/registrationPage.html',
            controller: 'registrationController'
        });
        $routeProvider.when('/login', {
            templateUrl: 'view1/login.html'
        });
    }]);

    /**
     * This controller is responsible to register an user.Admin role can register admin, Editor role can't regisiter and admin
     * @param $log
     * @param $scope
     * @param $rootScope
     * @param $location
     * @param $window
     * @param adminService
     * @constructor
     */
    function RegistrationController($log, $scope, $rootScope, $location, $window, adminService) {
        $scope.user = {};
        $scope.roles = ["Editor", "Admin"];
        $scope.selectedRole = $scope.roles[0];

        $scope.reset = function () {
            $scope.user = {
                "uname": '',
                "email": '',
                "password": '',
                "mobile": '',
            };
        };
        /**
         * Singup method is exposed to resigter a user
         * @param isValid flag to check form is valid or not if not then show a message to user
         */
        $scope.signUp = function (isValid) {
            if (!isValid) {
                $window.alert("Some fields of form are not correct!!!!");
                return;
            }
            var signUpRequest = {
                "username": $scope.user.name,
                "email": $scope.user.email,
                "mobile": $scope.user.mno,
                "password": $scope.user.password,
                "role": $scope.selectedRole
            };
            adminService.signUp(signUpRequest).then(function (res) {
                $location.path($rootScope.NavigationPath.LOGIN);
                $scope.reset();
            }, function (err) {
                $log.error('Error to sing up :', err);
            });
        };

        /**
         * onLoad function get token and remove the things which are not required in this(for a role) module.
         */
        function onLoad() {
            $rootScope.token = adminService.getToken();
            if ($rootScope.token && $rootScope.token.role !== "Admin") {
                var index = $scope.roles.indexOf("Admin");
                if (index > -1) {
                    $scope.roles.splice(index, 1);
                }
            }
            $log.info('onLoad : regisitrationController');
        }
        onLoad();
    }

    var requires = [
        '$log',
        '$scope',
        '$rootScope',
        '$location',
        '$window',
        'adminService',
        RegistrationController
    ];
    app.controller('registrationController', requires);
}());
