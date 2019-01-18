/*global angular*/
(function () {
    'use strict';
    /**
     * Navigation paths. It contains paths which are required to navigate between views.
     * The values used here are the values which will be displayed in the browser as url.
     * To navigate to a view it can be used like this
     * $location.path(NavigationPath.HOME);// Take to home page.
     * NavigationPath should not be polluted or misunderstood as ViewPath.
     * ViewPath are the path of the location where html files are stored.
     */
    var app = angular.module('myApp');
    app.constant('NavigationPath', {
        HOME: '/home',
        LOGIN: '/login',
        REGISITOR: '/view2'
    });
}());
