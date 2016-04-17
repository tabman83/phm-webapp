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

	vm.enableSchedule = function(event) {
	};

	vm.disableSchedule = function(event) {
	};

	vm.deleteSchedule = function(event) {
	    // Appending dialog to document.body to cover sidenav in docs app
		var confirmDeleteDialog = $mdDialog.confirm()
			.title('Would you like to delete this schedule?')
			.textContent('You won\'t be able to undo this operation.')
			.parent(angular.element(document.body))
        	.clickOutsideToClose(false)
			.ariaLabel('Delete schedule')
			.targetEvent(event)
			.ok('Ok')
			.cancel('Cancel');
	    $mdDialog.show(confirmDeleteDialog).then(function() {
	      	console.log('delete');
	    });
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
