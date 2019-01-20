/*global angular*/
(function () {
    'use strict';

    /***
     * This helper service is responsible to handle all the other stuff if we are doing after logged in.like storing token into
     * cookies and other stuff.
     * @param $rootScope
     * @param $http
     * @param $cookies
     * @return {{setToken: setToken}}
     * @constructor
     */

    function LoginHelperService($q, $log, $rootScope, $http, $cookies, apiService) {

        /***
         * Set default  token properties
         * @param res
         */
        function setDefaultTokenProperties(res) {
            var token, tempObject, rolePermission,
                now = new Date(),
                exp = new Date(now.setTime(now.getTime() + Number(2) * 60 * 60 * 1000));
            if (!res) {
                //if response is not defined simple return.
                $rootScope.token = null;
                $log.error('Response is not defined not able to set token. For more info please check response of requested api', res);
                return;
            }
            $log.info('Setting token......');
            tempObject = {
                auth: res.token,
                userId: res.user.email,
                userName: res.user.username,
                mobile: res.user.mobile,
                sysId: res.user._id,
                role: res.user.role,
            };

            token = angular.toJson(tempObject);

            //$cookies.putObject('token', token);

            //TODO: as cookies is not working i am storing into local storage
            localStorage.setItem('token', token);
            //$rootScope.token = angular.fromJson($cookies.getObject('token'));
            //TODO: remove below code once cookies start working
            $rootScope.token = angular.fromJson(localStorage.getItem('token'));
            $log.info('user Role is : ', $rootScope.token.role);
            $log.info('Token has been set');
        }

        /***
         * This function is responsible for generating token for different-2 login.
         * @param response which comes from api call
         */
        function setToken(response) {
            setDefaultTokenProperties(response);
        }

        function login(userData) {
            var deferred = $q.defer();
            var path = "login";
            apiService.post(path, userData).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                $log.error(error);
                deferred.reject(error);
            });
            return deferred.promise;
        }

        return {
            setToken: setToken,
            login: login
        };

    }

    var app = angular.module('myApp.loginView'),
        requires = [
            '$q',
            '$log',
            '$rootScope',
            '$http',
            '$cookies',
            'apiService',
            LoginHelperService
        ];
    app.factory('loginService', requires);
}());
