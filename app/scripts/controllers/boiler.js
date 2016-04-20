angular.module('PhmWebApp').controller('BoilerController', function($mdMedia, $mdDialog, $scope, $rootScope, schedules, Schedule, dataService) {
	'use strict';

	var vm = this;
	var boilerStatus = false;
	var enabled = true;
	var timeoutHandle = null;
	var timezone = moment.tz.guess();

	vm.schedules = schedules;

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
			locals: {
				timezone: timezone
			}
        }).then(function(result) {
			$scope.app.isLoading = true;
			return Schedule.save(result).$promise.then(function(savedSchedule) {
				vm.schedules.push(savedSchedule)
			});
		}).finally(function() {
			$scope.app.isLoading = false;
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

	vm.enableSchedule = function(schedule, event) {
		$scope.app.isLoading = true;
		schedule.paused = false;
		schedule.$update().catch(function() {
			schedule.paused = true;
		}).finally(function() {
			$scope.app.isLoading = false;
		});
	};

	vm.disableSchedule = function(schedule, event) {
		$scope.app.isLoading = true;
		schedule.paused = true;
		schedule.$update().catch(function() {
			schedule.paused = false;
		}).finally(function() {
			$scope.app.isLoading = false;
		});
	};

	vm.deleteSchedule = function(schedule, event) {
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
			$scope.app.isLoading = true;
	      	return Schedule.remove({ id: schedule._id }).$promise.then(function(deletedSchedule) {
				for (var i = 0; i < vm.schedules.length; i++) {
   					if(vm.schedules[i]._id === deletedSchedule._id) {
      					vm.schedules.splice(i, 1);
      					break;
   					}
				}
			}).finally(function() {
				$scope.app.isLoading = false;
			});
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
