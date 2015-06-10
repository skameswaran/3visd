
var studentApp = angular.module('studentApp', ['ngRoute', 'chartControllers',
     'grpChartControllers', 'multiChartControllers', 'multiLineCatController', 'stackedBarControllers',
     'grpStackControllers', 'sampleControllers']);

studentApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: function ($routeParams) {
                return '../login.html';
            }
        })
        .when('/:dir/:page', {
            templateUrl: function ($routeParams) {
                return '../' + $routeParams.dir + '/views/' + $routeParams.page + '.html';
            }
        })
        .otherwise({

        });

}]);

studentApp.constant("appConsts", {
    "jsonurl": "/content/json/student-profiles.json",
    "gMailurl": "http://www.gmail.com"

});
