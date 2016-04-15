angular.module('PhmWebApp', ['ngMaterial', 'ui.router', 'angularMoment', 'LocalStorageModule', 'rt.debounce', 'mdPickers']).run(function() {

}).config(function($locationProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {
	'use strict';

	localStorageServiceProvider.setPrefix('PhmWebApp');

	$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

	$stateProvider.state('login', {
        url: '/login?returnTo',
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    }).state('error', {
        url: '/error?returnTo',
        templateUrl: 'views/error.html',
        controller: 'ErrorController',
        controllerAs: 'vm'
    }).state('app', {
		abstract: true,
        controller: 'AppController',
        controllerAs: 'app',
        templateUrl: 'views/app.html',
		resolve: {
			isConnected: ['dataService', function(dataService) {
                return dataService.initialize();
            }],
		}
	}).state('app.dashboard', {
		url: '/dashboard',
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardController',
		controllerAs: 'vm'
	}).state('app.boiler', {
		url: '/boiler',
		templateUrl: 'views/boiler.html',
		controller: 'BoilerController',
		controllerAs: 'vm'
	});

	$urlRouterProvider.otherwise('/dashboard');
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

});
