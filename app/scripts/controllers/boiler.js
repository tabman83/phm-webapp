angular.module('PhmWebApp').controller('BoilerController', function($mdMedia, $mdDialog, $scope, $rootScope, dataService) {
	'use strict';

	var vm = this;
	var boilerStatus = false;
	var enabled = true;
	var timeoutHandle = null;

	vm.createNewSchedule = function(event) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.app.customFullscreen;
		$mdDialog.show({
            controller: 'NewScheduleDialogController',
            controllerAs: 'vm',
			targetEvent: event,
            bindToController: true,
            templateUrl: 'dialogs/new-schedule.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
        }).then(function(result) {
			console.log(result);
		});
	};

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

	$scope.$on('$destroy', function() {
		clearTimeout(timeoutHandle);
	});

});
