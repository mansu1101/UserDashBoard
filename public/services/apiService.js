(function () {
    'use strict';

    function apiService($http) {
        var baseUrl = "http://localhost:5555";

        function get(path, data) {
            var url = baseUrl + '/' + path;
            return $http.get(url, data);
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