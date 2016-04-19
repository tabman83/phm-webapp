angular.module('PhmWebApp').filter('parseCron', function() {
    return function(input) {
        return prettyCron.toString(input, true);
    };
});
