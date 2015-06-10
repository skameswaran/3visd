var studentFactory = angular.module('studentFactory', ['ngResource']);

studentFactory.factory('Profiles', ['$resource', 'appConsts', function ($resource, appConsts) {
    return $resource(appConsts.jsonurl);
}]);