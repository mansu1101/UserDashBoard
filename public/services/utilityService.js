(function () {

    function UtilityService($log) {

        return {
            isObject: angular.isObject,
            isFunction: angular.isFunction
        };
    }

    var app = angular.module('myApp'),
        requires = [
            '$log',
            UtilityService
        ];
    app.factory('utilityService', requires);

}());