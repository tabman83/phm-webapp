angular.module('PhmWebApp').directive('widgetSensors', function() {
    'use strict';

    return {
        controllerAs: 'vm',
        template: [
            '<widget class="x2">',
                '<header ng-bind="vm.location"></header>',
                '<div class="flex">',
                    '<div class="flex flex-column flex-grow-1">',
                        '<div class="content chart1"></div>',
                        '<div class="chart number"><span ng-bind="vm.value | number : 1"></span><span ng-bind="::vm.measureUnit"></span></div>',
                    '</div>',
                    '<div class="flex flex-column flex-grow-1">',
                        '<div class="content chart2"></div>',
                        '<div class="chart number"><span ng-bind="vm.value | number : 1"></span><span ng-bind="::vm.measureUnit"></span></div>',
                    '</div>',
                '</div>',
            '</widget>'
        ].join(''),
        scope: {
            location: '<',
        },
        replace: true,
        controller: function($interval, $scope) {
            var vm = this;
            vm.value = '--'
            vm.location = $scope.location;
            vm.measureUnit = '°';

            var promise = $interval(function() {
                vm.value = 40*Math.random();
                $scope.point.update(vm.value);
            }, 1000);

            $scope.$on('$destroy', function() {
                $interval.cancel(promise);
            });
        },
        link: function(scope, element, attrs) {

            var gaugeOptions = {
                chart: {
                    type: 'solidgauge',
                    renderTo: element[0].querySelectorAll('.chart1')[0],
                    margin: [0, 0, 0, 0],
                    backgroundColor: 'transparent'
                },
                title: null,
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    min: -50,
                    max: +50,
                    minColor: '#009CE8',
                    maxColor: '#009CE8',
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickLength: 0,
                    minTickInterval: 500,
                    labels: {
                        enabled: false
                    }
                },
                pane: {
                    size: '100%',
                    center: ['50%', '60%'],
                    startAngle: -130,
                    endAngle: 130,
                    background: {
                        borderWidth: 20,
                        backgroundColor: '#eee',
                        shape: 'arc',
                        borderColor: '#eee',
                        outerRadius: '90%',
                        innerRadius: '90%'
                    }
                },
                tooltip: {
                    enabled: false
                },
                plotOptions: {
                    solidgauge: {
                        borderColor: '#009CE8',
                        borderWidth: 20,
                        radius: 90,
                        innerRadius: '90%',
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                series: [{
                    name: 'windSpeed',
                    data: [-50]
                }],
                credits: {
                    enabled: false
                }
            };
            // The speed gauge
            var chart = new Highcharts.Chart(gaugeOptions);

            var svg = element.find('svg').attr('viewBox', '0 0 600 400').attr('width', '100%').attr('height', '100%');

            var thermometer = document.createElementNS('http://www.w3.org/2000/svg','path');
            thermometer.setAttributeNS(null, 'd', 'M 13 5 L 13 6 L 13 16 C 11.263428 17.051776 10 18.82923 10 21 C 10 24.301625 12.698375 27 16 27 C 19.301625 27 22 24.301625 22 21 C 22 18.82923 20.736572 17.051776 19 16 L 19 15 L 21 15 L 21 13 L 19 13 L 19 11 L 21 11 L 21 9 L 19 9 L 19 7 L 21 7 L 21 5 L 19 5 L 18 5 L 14 5 L 13 5 z M 15 7 L 17 7 L 17 16.4375 L 17 17.0625 L 17.59375 17.34375 C 19.004394 17.961107 20 19.353147 20 21 C 20 23.220375 18.220375 25 16 25 C 13.779625 25 12 23.220375 12 21 C 12 19.353147 12.995606 17.961107 14.40625 17.34375 L 15 17.0625 L 15 16.4375 L 15 7 z');
            thermometer.setAttributeNS(null, 'transform', 'scale(8 8) translate(21 14)');
            thermometer.setAttributeNS(null, 'fill', '#eee');

            //angular.element(sub).append('<path style="e-font-specification:Bitstream Vera Sans" d="" color="#000" overflow="visible" font-family="Bitstream Vera Sans"/>');
            //sub.setAttributeNS(null, 'transform', 'scale(10 10)');
            //sub.setAttributeNS(null, 'zIndex', '10');

            //var thermometer = angular.element('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" style="fill: #DBDBDB"><path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 13 5 L 13 6 L 13 16 C 11.263428 17.051776 10 18.82923 10 21 C 10 24.301625 12.698375 27 16 27 C 19.301625 27 22 24.301625 22 21 C 22 18.82923 20.736572 17.051776 19 16 L 19 15 L 21 15 L 21 13 L 19 13 L 19 11 L 21 11 L 21 9 L 19 9 L 19 7 L 21 7 L 21 5 L 19 5 L 18 5 L 14 5 L 13 5 z M 15 7 L 17 7 L 17 16.4375 L 17 17.0625 L 17.59375 17.34375 C 19.004394 17.961107 20 19.353147 20 21 C 20 23.220375 18.220375 25 16 25 C 13.779625 25 12 23.220375 12 21 C 12 19.353147 12.995606 17.961107 14.40625 17.34375 L 15 17.0625 L 15 16.4375 L 15 7 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"/></svg>');
            svg.append(thermometer);

            var paths = svg[0].getElementsByTagName('path');
            paths[0].setAttributeNS(null, 'stroke-linejoin', 'round');
            paths[1].setAttributeNS(null, 'stroke-linejoin', 'round');
            scope.point = chart.series[0].points[0];
        }
    }
});
