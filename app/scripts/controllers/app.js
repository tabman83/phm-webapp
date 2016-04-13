angular.module('PhmWebApp').controller('AppController', function($mdSidenav, $location, $rootScope, $scope) {
	'use strict';

	var vm = this;

	vm.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	$rootScope.$on('actuator', function(event, value) {
		$scope.$applyAsync(function() {
			vm.boilerStatus = value;
		});
	});
});
