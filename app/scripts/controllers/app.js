angular.module('PhmWebApp').controller('AppCtrl', function($mdSidenav, $location) {
	'use strict';

	var vm = this;

	vm.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	vm.navigateAndToggleSidenav = function(location, menuId) {
		$mdSidenav(menuId).toggle();
		$location.path(location);
	};

});
