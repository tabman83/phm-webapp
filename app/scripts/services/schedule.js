angular.module('PhmWebApp').factory('Schedule', function($resource, settings) {
    return $resource(settings.SERVER_URL + '/schedules/:id');
});
