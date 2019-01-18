/*global angular*/
(function () {
    'use strict';

    /**
     * Routes in Cartos are authenticated by the help of {@link authService}.
     * This service uses {@link $q} service. It return a authenticated
     * promise.If User is logged in then the promise is resolved else it
     * rejects the promise and navigate the user to Login Page.
     * @param   {object} $q
     * @param   {object}   $rootScope
     * @param   {object} $location
     * @param   {object} NotifierService
     * @param   {object} ViewPath
     */
    function Authenticator($q, $rootScope, $location, $cookies) {


        /**
         * it navigates the user
         * to Log in page.
         */
        function promptUserReLogin() {
           /* NotifierService.notify('PLEASE_LOGIN_AGAIN', NotifierService.ERROR);
            $location.path($rootScope.NavigationPath.LOGIN);*/
            $location.path('/login');
        }

        /**
         * @desc destroy cookies
         * navigate to Log in page.
         */
        this.destroyAuth = function removeToken() {
            //delete $cookies.token;
            $rootScope.token = null;
            $cookies.remove('token');
            localStorage.removeItem('token');
            promptUserReLogin();
        };

         /**
         * Authenticates the user on route changes and navigate to corresponding
         * view. If the user is not authenticated then it navigates the user
         * to Log in page.
         * @returns {Object} authenticated promise.
         */
        this.isAuthenticated = function () {
            var isAuthenticated = false;
            //here we are checking if stack is cartosdesign.com than we are allowing to navigate to the home page.
           // $rootScope.token = angular.fromJson($cookies.getObject('token'));

            //TODO: remove below code once cookies start working
            $rootScope.token = angular.fromJson(localStorage.getItem('token'));
                if ($rootScope.token) {
                    isAuthenticated = true;
                  //  setPermission();
                } else {
                    isAuthenticated = false;
                    promptUserReLogin();
                }
            return isAuthenticated;
        };

        /**
         * This function gets the view permission
         * @returns {Object} promise.
         */
        this.checkUserViewPermission = function () {

            if (!$rootScope.token) {
                $rootScope.hasPermission = false;
                return;
            }
            var request = {
                userId: $rootScope.token.userId,
                resourceType: 'user',
                email: $rootScope.token.userId,
                permission: 'view'
            };

            // success callback.
            function onPermissionSuccess(response) {
                $rootScope.hasPermission = (response && response.data.data && response.data.data.permission && response.data.data.permission.view ? true : false);
            }

            // error callback.
            function onPermissionError(error) {
                $rootScope.hasPermission = false;
            }

            ApiService.getPermissions(request).then(onPermissionSuccess, onPermissionError);

        };
    }

    var app = angular.module('myApp'),
        requires = [
            '$q',
            '$rootScope',
            '$location',
            '$cookies',
            Authenticator
        ];
    app.service('AuthenticatorService', requires);

}());
