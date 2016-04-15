angular.module('PhmWebApp').controller('AppController', function($mdMedia, $mdSidenav, $location, $rootScope, $scope) {
	'use strict';

	var vm = this;

	vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

	vm.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	$scope.$watch(function() {
      	return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      	vm.customFullscreen = (wantsFullScreen === true);
    });

	$rootScope.$on('actuator', function(event, value) {
		$scope.$applyAsync(function() {
			vm.boilerStatus = value;
		});
	});
});
