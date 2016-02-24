angular.module('PhmWebApp').directive('widgetDatetime', function() {
    'use strict';

    return {
        controllerAs: 'vm',
        template: [
            '<widget>',
                '<header>Current date and time</header>',
                '<div class="content">',
                    '<div class="number" ng-bind="vm.date | date : \'shortTime\'"></div>',
                    '<div class="desc" ng-bind="vm.date | date : \'fullDate\'"></div>',
                '</div>',
            '</widget>'
        ].join(''),
        replace: true,
        controller: function($interval, $scope) {
            var vm = this;

            var interval = 1000 * 60;

            vm.date = Date.now();

            var promise = $interval(function() {
                vm.date += interval;
            }, interval);

            $scope.$on('$destroy', function() {
                $interval.cancel(promise);
            });
        }
    };
});
