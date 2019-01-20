(function () {
    'use strict';

    /***
     * This service is end point for the client. all the calls for http/ server will send by this service
     * @param $http
     * @returns {{post: (function(*, *=): *), get: (function(*): *), del: (function(*, *=): *), put: (function(*, *=):
     * (*|HttpPromise|IDBRequest<IDBValidKey>|Promise<void>))}}
     */
    function apiService($http) {
        var baseUrl = "http://localhost:5555";

        function get(path) {
            var url = baseUrl + '/' + path;
            return $http.get(url);
        }

        function post(path, data) {
            var url = baseUrl + '/' + path;
            return $http.post(url, data);
        }

        function put(path, data) {
            var url = baseUrl + '/' + path;
            return $http.put(url, data);
        }

        function del(path, data) {
            var url = baseUrl + '/' + path;
            return $http.delete(url, data);
        }

        var apiService = {
            get: get,
            post: post,
            put: put,
            del: del
        };
        return apiService;
    }

    var app = angular.module('myApp'),
        requires = [
            '$http',
            apiService
        ];
    app.factory('apiService', requires);
}());