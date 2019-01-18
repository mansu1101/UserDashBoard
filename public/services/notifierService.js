/*global angular*/
(function () {
    'use strict';

    /**
     * Notification service. It will be use to notify the user. It uses
     * angularjs-toastr to display messages.
     * @param {object} $localStorage local storage service.
     * @param {Array}  toaster       toastr service from angularjs-toastr
     */
    function NotifierService($filter, $localStorage, toaster, $rootScope, $location, NavigationPath) {

        //Translate string. It will be used by filter.
        var TRANSLATE = 'translate',
            DISPLAY_TIME = 8000;

        //Various notification types.
        this.ERROR = 'error';
        this.WARNING = 'warning';
        this.SUCCESS = 'success';
        this.INFO = 'info';
        /**
         * Notifies the user with error popup.
         * @param msgText message to be displayed
         */
        this.error = function (msgText) {
            toaster.error('', $filter(TRANSLATE)(msgText));
        };

        /**
         * Notifies the user with warning popup.
         * @param msgText message to be displayed
         */
        this.warning = function (msgText) {
            toaster.warning('', $filter(TRANSLATE)(msgText), 10000);
        };

        /**
         * Notifies the user with success popup.
         * @param msgText message to be displayed
         */
        this.success = function (msgText) {
            toaster.success('', $filter(TRANSLATE)(msgText));
        };

        /**
         * Notifies the user with info popup.
         * @param msgText message to be displayed
         */
        this.info = function (msgText) {
            toaster.info('', $filter(TRANSLATE)(msgText));
        };
        /**
         * it clear the toaster message
         */
        this.clear = function () {
            toaster.clear();
        };
    }

    var app = angular.module('myApp'),
        requires = [
            '$filter',
            '$localStorage',
            'toaster',
            '$rootScope',
            '$location',
            'NavigationPath',
            NotifierService
        ];
    app.service('notifierService', requires);
}());
