(function () {

    angular.module('myApp1', ['ngCookies'])
        .controller('mainCtrl', ['$cookies', function($cookies) {

            $cookies.put('myFavorite', "cheese");
            var favoriteCookie = $cookies.get('myFavorite');

            console.log("myFavorite = " + favoriteCookie);

        }]);

})();