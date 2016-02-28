angular.module('PhmWebApp', ['ngMaterial', 'ngRoute', 'angularMoment', 'rt.debounce']).run(function(DataService) {
}).config(function($routeProvider) {
	'use strict';

	$routeProvider.when('/Dashboard', {
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardCtrl',
		controllerAs: 'vmd'
	}).when('/Sensors', {
		templateUrl: 'views/sensors.html',
		controller: 'SensorsCtrl',
		controllerAs: 'vms'
	}).when('/Actuators', {
		templateUrl: 'views/actuators.html',
		controller: 'ActuatorsCtrl',
		controllerAs: 'vma'
	}).when('/Scheduler', {
		templateUrl: 'views/scheduler.html',
		controller: 'SchedulerCtrl',
		controllerAs: 'vmc'
	}).when('/History', {
		templateUrl: 'views/history.html',
		controller: 'HistoryCtrl',
		controllerAs: 'vmh'
	}).when('/Settings', {
		templateUrl: 'views/settings.html'
	}).otherwise({
		redirectTo: '/Dashboard'
	});

});

angular.element(document).ready(function () {
    'use strict';

	function reqListener () {
		var settingsData = JSON.parse(this.responseText);
		angular.module('PhmWebApp').constant('settings', settingsData);
        angular.bootstrap(document, ['PhmWebApp']);
	}

	var req = new XMLHttpRequest();
	req.addEventListener('load', reqListener);
	req.open('GET', 'settings.json');
	req.send();
/*
    window.jQuery.get('settings.json').success(function (data) {
        angular.module('bis.app.mstrackweb2016').constant('settings', data);
        angular.bootstrap(document, ['bis.app.mstrackweb2016']);
    }).error(function(error) {
        var msg = 'An error occurred while loading the configuration file. ';
        if( error.status === 0 ) {
            msg += 'Host is unreachable.';
        } else {
            msg += error.responseText;
        }
        console.error(msg);
    });*/
});
