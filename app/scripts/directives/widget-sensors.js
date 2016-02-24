angular.module('PhmWebApp').directive('widgetSensors', function() {
    'use strict';

    return {
        controllerAs: 'vm',
        template: [
            '<widget>',
                '<header ng-bind="vm.location"></header>',
                '<div class="content">',
                    '<svg version="1.1" style="font-family:Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif;font-size:12px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">',
                        '<defs><clipPath id="highcharts-1"><rect x="0" y="0" width="300" height="200"></rect></clipPath></defs>',
                        '<rect x="0" y="0" width="300" height="200" fill="transparent" class=" highcharts-background"></rect>',
                        '<path fill="#DBDBDB" d="M 81.05600011929197 177.85088487178854 A 90 90 0 1 1 219.0018162839409 177.78191195795847 L 219.0018162839409 177.78191195795847 A 90 90 0 1 0 81.05600011929197 177.85088487178854 Z" stroke="#DBDBDB" stroke-width="20" zIndex="0" stroke-linejoin="round"></path>',
                        '<g class="highcharts-grid" zIndex="1"></g><g class="highcharts-axis" zIndex="2"></g>',
                        '<g class="highcharts-data-labels highcharts-series-0 highcharts-tracker" zIndex="2" visibility="visible" transform="translate(0,0) scale(1 1)" style="">',
                            '<g zIndex="1" style="" transform="translate(120,125)"></g>',
                        '</g>',
                        '<g class="highcharts-series-group" zIndex="3">',
                            '<g class="highcharts-series highcharts-series-0 highcharts-tracker" zIndex="0.1" transform="translate(0,0) scale(1 1)" style="" clip-path="url(#highcharts-1)">',
                                //'<path fill="rgb(0,156,232)" d="M 81.05600011929197 177.85088487178854 A 90 90 0 0 1 60.14707764571946 114.85681573384402 L 60.14707764571946 114.85681573384402 A 90 90 0 0 0 81.05600011929197 177.85088487178854 Z" stroke="#009CE8" stroke-width="20" sweep-flag="0" stroke-linejoin="round" stroke-linecap="round"></path>',
                                '<path fill="rgb(0,156,232)" d="M 81.05600011929197 177.85088487178854 A 90 90 0 0 1 {{vm.gaugeX}} {{vm.gaugeY}}" stroke="#009CE8" stroke-width="20" sweep-flag="0" stroke-linejoin="round" stroke-linecap="round"></path>',
                            '</g>',
                            '<g class="highcharts-markers highcharts-series-0" zIndex="0.1" transform="translate(0,0) scale(1 1)" clip-path="none"></g>',
                        '</g>',
                        '<g class="highcharts-legend" zIndex="7">',
                            '<g zIndex="1"><g>',
                        '</g>',
                        '<g class="highcharts-axis-labels highcharts-yaxis-labels" zIndex="7"></g>',
                    '</svg>',
                '</div>',
            '</widget>'
        ].join(''),
        scope: {
            location: '<',
        },
        replace: true,
        controller: function($interval, $scope) {
            var vm = this;
            vm.location = $scope.location;

            var angle = 90 * Math.PI / 180;
            vm.gaugeX = 60.14707764571946;
            vm.gaugeY = 114.85681573384402;
        }
    };
});
