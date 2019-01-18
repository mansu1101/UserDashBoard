/*global angular*/
(function () {
    'use strict';

    /***
     * This helper service is responsible to handle all the other stuff if we are doing after logged in.like storing token into
     * cookies and other stuff.
     * @param $rootScope
     * @param $cookies
     * @param Configuration
     * @return {{}}
     * @constructor
     */

    function AdminHelperService($q, $log, $rootScope, $http, apiService) {
        function signUp(userData) {
            var deferred = $q.defer();
            var path = "signUp";
            apiService.post(path, userData).then(function (response) {
                console.log(response);
                deferred.resolve(response);
            }, function (error) {
                console.log(error);
                deferred.reject(error);
            });
            return deferred.promise;
        }

        /***
         * Get Users if we pass ID then we will get only single user otherwise all.
         * @param Id
         * @returns {*}
         */
        function getUsers(Id) {
            var deferred = $q.defer();
            var path = "users";
            if (Id) {
                path = "user/" + Id;
                apiService.get(path).then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                apiService.get(path).then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        }

        function getToken() {
            return angular.fromJson(localStorage.getItem('token')) || false;
        }

        return {
            getUsers: getUsers,
            signUp: signUp,
            getToken: getToken
        };

    }

    var app = angular.module('myApp'),
        requires = [
            '$q',
            '$log',
            '$rootScope',
            '$http',
            'apiService',
            AdminHelperService
        ];
    app.factory('adminService', requires);
}());
