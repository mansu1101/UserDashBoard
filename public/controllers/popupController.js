(function () {
    'use strict';

    var app = angular.module('myApp');
    /**
     * Login Controller to handle login and store the token after login.
     * @param $scope
     * @param loginService
     * @param $window
     */
    function popupController($log, $scope, $dialog, adminService, $rootScope, $window, $location, homeService) {

        $scope.save = function () {
            $dialog.close($scope.item);
        };

        $scope.close = function () {
            $dialog.close(undefined);
        };
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
        popupController
    ];
    app.controller('popupController', require);
}());