angular.module('PhmWebApp').controller('BoilerController', function($scope, $rootScope, dataService) {
	'use strict';

	var vm = this;
	var boilerStatus = false;
	var enabled = true;
	var timeoutHandle = null;

	vm.boilerSwitchStatus = function() {
		if(arguments.length) {
			if(enabled) {
				boilerStatus = arguments[0];
				dataService.sendBoolean('boiler', boilerStatus);
				enabled = false;
				timeoutHandle = setTimeout(function() {
					enabled = true;
				}, 1500);
			}
		} else {
			return boilerStatus;
		}
	};

	$rootScope.$on('actuator', function(event, value) {
		boilerStatus = value;
		enabled = false;
		clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(function() {
			enabled = true;
		}, 1500);
	});

/*
	vm.clickBoilerSwitch = function() {
		if(enabled) {
			boilerStatus = !boilerStatus;
			dataService.sendBoolean('boiler', boilerStatus);
			enabled = false;
			timeoutHandle = setTimeout(function() {
				enabled = true;
			}, 1500);
		}
	};
*/
	$scope.$on('$destroy', function() {
		clearTimeout(timeoutHandle);
	});

});
