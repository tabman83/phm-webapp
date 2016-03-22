angular.module('PhmWebApp').directive('widgetSwitch', function($timeout, DataService) {
    'use strict';

    return {
        controllerAs: 'vm',
        template: [
            '<widget>',
                '<header>switch name</header>',
                '<div class="flex">',
                    '<div class="flex flex-column flex-grow-1">',
                        '<div class="content flex-row">',
                            '<div class="switch-border">',
                                '<a ng-click="vm.changeStatus()" class="switch-button" ng-class="{ on: vm.status, off: !vm.status }" href="#"></a>',
                            '</div>',
                        '</div>',
                        '<div class="number">next on</div>',
                    '</div>',
                '</div>',
            '</widget>'
        ].join(''),
        scope: {
            location: '<',
        },
        replace: true,
        controller: function($rootScope, $scope) {
            var vm = this;
            var timeoutHandle = null;

            vm.status = false;

            vm.changeStatus = function() {
                if(!timeoutHandle) {
                    vm.status = !vm.status;
                    timeoutHandle = $timeout(function() {
                        timeoutHandle = null;
                    }, 2000);
                    DataService.sendBoolean(vm.location, vm.status);
                }
            };

            $scope.$on('$destroy', function() {
                $timeout.cancel(timeoutHandle);
            });
        }
    }
});
