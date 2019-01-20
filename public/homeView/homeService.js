/*global angular*/
(function () {
    'use strict';

    /***
     * This helper service is responsible to handle all the other stuff if we are doing after logged in.like storing token into
     * cookies and other stuff.
     * @param $rootScope
     * @param $cookies
     * @param Configuration
     * @return {{setToken: setToken}}
     * @constructor
     */

    function homeService($q, $log, $rootScope, $http, adminService, apiService) {

        function getUsers(Id) {
            return adminService.getUsers(Id);
        }

        return {
            getUsers: getUsers
        };

    }

    var app = angular.module('myApp.loginView'),
        requires = [
            '$q',
            '$log',
            '$rootScope',
            '$http',
            'adminService',
            'apiService',
            homeService
        ];
    app.factory('homeService', requires);
}());
