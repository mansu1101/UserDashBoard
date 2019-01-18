/*global angular*/
(function () {
    'use strict';

    /**
     * Constructor for ApiInterceptor service. It will intercept each request which we'll be made
     * in app and will append the authentication token in the request header.
     * @param   {object}    $q
     * @param   {object}    $rootScope
     * @param   {object}    $location
     * @param   {object}    $cookies
     * @returns {object}
     */
    function ApiInterceptor($log, $q, $window, $rootScope, $routeParams, $location, $cookies, HttpCodes, Utils) {
        var excludeUrl = [
            '/login'
        ];

        /**
         * We need a common error handler to deal with errors. errorHandler function will do the
         * job for us. It make sure that proper message is displayed to the user if anything
         * goes wrong. It also makes sure that it displays generics message when errors are so many.
         *
         * @param errorData error object sent from backend.
         */
        function errorHandler(errorData) {
            // var userMessage = errorData.userMessage;
            // notifierService.notify(userMessage, notifierService.ERROR);
        }

        /**
         * Function to refresh the cookie.
         * The function extracts the token details from the response header and sets it in the cookie
         * @param response object sent from backend.
         */
        function refreshCookie(response) {
            var headers = Utils.isObject(response) && Utils.isFunction(response.headers) ? response.headers() : {},
                now = new Date(),
                exp = new Date(now.setTime(now.getTime() + Number(2) * 60 * 60 * 1000)),
                oldToken = angular.fromJson($cookies.getObject('token'));
            //TODO: remove below line once cookies stable
            //  oldToken = angular.fromJson(localStorage.getItems('token'));
            $log.info('refreshing cookies', (headers['authorization'] && oldToken));
            if (headers['authorization'] && oldToken) {
                //converting the object to json string cause cookies does not allow objects...
                var token = angular.toJson({
                    auth: headers['authorization'],
                    userName: oldToken.email,
                    sysId: oldToken.sysId,
                    mobile: oldToken.mobile,
                    role: oldToken.role
                });
                //Update cookie and rootScope.token with new token value
                $cookies.putObject('token', token, {
                    expires: exp,
                    secure: true
                });
                //TODO: remove below line once cookies stable
                localStorage.putItem('token', token);
                $rootScope.token = angular.fromJson(localStorage.getItem('token'));
            }
        }

        /**
         * Standard $http request object. We are adding header to the overriding object.
         * @param config
         * @returns {*}
         */
        this.request = function (config) {
            config.headers = config.headers || {};
            //var token = $cookies.getObject('token');
            var token = localStorage.getItem('token');
            if (token && config.url.search('/login') === -1) {
                //retrieving the token from cookies and setting to the session in header...
                config.headers['x-access-token'] = angular.fromJson(token).auth;
            }
            return config;
        };

        /**
         * Standard $http response object. We are refreshing the cookie with new token for every response received.
         * @param response object sent from backend.
         */
        this.response = function (response) {
            // refreshCookie(response);// getting error while loading the page
            return response;
        };

        /**
         * @param response
         * @returns {*}
         */
        this.responseError = function (response) {
            $log.info('Response Error : ', response);

            if (response.status === HttpCodes.UNAUTHORIZED) {
                if ($rootScope.NavigationPath === undefined) {
                    throw {
                        name: 'ConfigurationMissing',
                        message: 'Navigation path is not provided.'
                    };
                }
                //var token = $cookies.getObject('token');
                localStorage.removeItem('token');
                //Do not display this notification if user is trying to login.
                // Error response handler for login api will display 'INVALID_CREDENTIALS' message instead.
                $window.alert(response.data._message);
                return $q.reject();
            }
            if(response.status === HttpCodes.UNPROCESSABLE_ENTITY){
                $window.alert(response.data._message);
            }
            if (response.status === HttpCodes.SERVICE_UNAVAILABLE) {
                //notifierService.error(response.data._error.name);
                $window.alert(response.data._message);
                $log.error(response.data._error.name);
                $location.path($rootScope.NavigationPath.LOGIN);
            }
        };
    }

    var app = angular.module('myApp'),
        requires = [
            '$log',
            '$q',
            '$window',
            '$rootScope',
            '$routeParams',
            '$location',
            '$cookies',
            'HttpCodes',
            'utilityService',
            //'notifierService',
            ApiInterceptor
        ];

    app.service('apiInterceptorService', requires);

}());
