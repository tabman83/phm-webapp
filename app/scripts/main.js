angular.module('PhmWebApp', ['ngMaterial', 'ngRoute', 'rt.debounce']).config(function($routeProvider) {
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
