(function () {
    'use strict';

    var app = angular.module('myApp.view1', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
        /**
         * A callback to authenticate routes navigation.
         * @param   {Object} AuthenticatorService
         * @returns {Object} authenticated promise.
         */
        function AuthenticateCb(AuthenticatorService) {
            return AuthenticatorService.isAuthenticated();
        }

        $routeProvider.when('/login', {
            templateUrl: 'view1/login.html'
        });
        $routeProvider.when('/singUp', {
            templateUrl: 'view2/registrationPage.html'
        });
        $routeProvider.when('/home', {
            templateUrl: 'view3/home.html',
            resolve: {
                authenticate: ['AuthenticatorService', AuthenticateCb]
            }
        });
    }]);

    /**
     * Login Controller to handle login and store the token after login.
     * @param $scope
     * @param loginService
     * @param $window
     */
    function loginController($scope, loginService, $window, $location) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.login = function (isValid){
            console.log(isValid);
            if (isValid &&  $scope.user.email &&  $scope.user.password ) {
                var request = {
                    "email": $scope.user.email,
                    "password": $scope.user.password
                };
                loginService.login(request).then(function (response) {
                    console.log(response);
                    loginService.setToken(response.data);
                    $location.path('/home');
                }, function (error) {
                    $location.path('/');
                });
            } else {
                $window.alert('UserName or Password is not valid');
            }
        };
        $scope.path = function () {
            $location.path('/singUp');
        }
    }

    var require = [
        '$scope',
        'loginService',
        '$window',
        '$location',
        loginController
    ];
    app.controller('LoginController', require);
}());