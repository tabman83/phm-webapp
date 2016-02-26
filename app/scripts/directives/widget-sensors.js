angular.module('PhmWebApp').directive('widgetSensors', function($window, $timeout, debounce) {
    'use strict';

    return {
        controllerAs: 'vm',
        template: [
            '<widget class="x2">',
                '<header ng-bind="vm.location"></header>',
                '<div class="flex">',
                    '<div class="flex flex-column flex-grow-1">',
                        '<div class="content chart chartTemperature"></div>',
                        '<div class="chart number"><span ng-bind="vm.temperatureValue | number : 1"></span><span ng-bind="::vm.temperatureMeasureUnit"></span></div>',
                    '</div>',
                    '<div class="flex flex-column flex-grow-1">',
                        '<div class="content chart chartHumidity"></div>',
                        '<div class="chart number"><span ng-bind="vm.humidityValue | number : 1"></span><span ng-bind="::vm.humidityMeasureUnit"></span></div>',
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
            vm.temperatureValue = '--';
            vm.humidityValue = '--';
            vm.location = $scope.location;
            vm.temperatureMeasureUnit = '°';
            vm.humidityMeasureUnit = '%';

            var promise = $interval(function() {
                vm.temperatureValue = 40*Math.random();
                vm.humidityValue = 90*Math.random();
                $scope.tPoint.update(vm.temperatureValue);
                $scope.hPoint.update(vm.humidityValue);
            }, 1000);

            $scope.$on('$destroy', function() {
                $interval.cancel(promise);
            });
        },
        link: function(scope, element, attrs) {

            var gaugeOptions = {
                chart: {
                    type: 'solidgauge',
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

            var fixSvgSize = debounce(90, function() {
                $timeout(function() {
                    for(var i=0; i<svg.length; i++) {
                        var $s = angular.element(svg[i]);
                        var width = $s.attr('width');
                        var height = $s.attr('height');
                        $s.attr('viewBox', '0 0 ' + width + ' ' + height).attr('width', '100%').attr('height', '100%');
                    };
                }, 1000, false);
            });

            angular.element($window).on('resize', fixSvgSize);
            scope.$on('$destroy', function() {
                angular.element($window).$off('resize');
            });

            gaugeOptions.chart.renderTo = element[0].querySelectorAll('.chartTemperature')[0];
            var chartTemperature = new Highcharts.Chart(gaugeOptions);
            var svg = element.find('svg');
            var thermometer = document.createElementNS('http://www.w3.org/2000/svg','path');
            thermometer.setAttributeNS(null, 'd', 'M 13 5 L 13 6 L 13 16 C 11.263428 17.051776 10 18.82923 10 21 C 10 24.301625 12.698375 27 16 27 C 19.301625 27 22 24.301625 22 21 C 22 18.82923 20.736572 17.051776 19 16 L 19 15 L 21 15 L 21 13 L 19 13 L 19 11 L 21 11 L 21 9 L 19 9 L 19 7 L 21 7 L 21 5 L 19 5 L 18 5 L 14 5 L 13 5 z M 15 7 L 17 7 L 17 16.4375 L 17 17.0625 L 17.59375 17.34375 C 19.004394 17.961107 20 19.353147 20 21 C 20 23.220375 18.220375 25 16 25 C 13.779625 25 12 23.220375 12 21 C 12 19.353147 12.995606 17.961107 14.40625 17.34375 L 15 17.0625 L 15 16.4375 L 15 7 z');
            thermometer.setAttributeNS(null, 'transform', 'scale(8 8) translate(21 14)');
            thermometer.setAttributeNS(null, 'fill', '#eee');
            svg.eq(0).append(thermometer);
            var paths = svg[0].getElementsByTagName('path');
            paths[0].setAttributeNS(null, 'stroke-linejoin', 'round');
            paths[1].setAttributeNS(null, 'stroke-linejoin', 'round');
            scope.tPoint = chartTemperature.series[0].points[0];

            gaugeOptions.chart.renderTo = element[0].querySelectorAll('.chartHumidity')[0];
            var chartHumidity = new Highcharts.Chart(gaugeOptions);
            var svg = element.find('svg');
            var thermometer = document.createElementNS('http://www.w3.org/2000/svg','path');
            thermometer.setAttributeNS(null, 'd', 'M25,1.173c0,0-16.615,20.135-16.615,31.211C8.385,41.562,15.822,49,25,49s16.615-7.438,16.615-16.615 C41.615,21.308,25,1.173,25,1.173z');
            thermometer.setAttributeNS(null, 'stroke-width', '5');
            thermometer.setAttributeNS(null, 'transform', 'scale(3.2 3.2) translate(70 50)');
            thermometer.setAttributeNS(null, 'stroke', '#eee');
            thermometer.setAttributeNS(null, 'fill', 'none');
            svg.eq(1).append(thermometer);
            var paths = svg[1].getElementsByTagName('path');
            paths[0].setAttributeNS(null, 'stroke-linejoin', 'round');
            paths[1].setAttributeNS(null, 'stroke-linejoin', 'round');
            scope.hPoint = chartHumidity.series[0].points[0];

            fixSvgSize();
        }
    }
});
