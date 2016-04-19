angular.module('PhmWebApp').filter('parseCronNext', function() {
    return function(input) {
        return moment(prettyCron.getNextDate(input, true)).tz("UTC").calendar();
    };
});
