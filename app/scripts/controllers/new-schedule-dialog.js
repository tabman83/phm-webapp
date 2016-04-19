angular.module('PhmWebApp').controller('NewScheduleDialogController', function($mdDialog, $scope) {
	'use strict';

	var vm = this;

	vm.datetime = new Date();
	vm.datetime.setSeconds(0, 0);
	vm.weekdays = [];
	vm.mode = 'turnon';
	vm.recur = 'onetime';

	vm.cancel = function() {
		$mdDialog.cancel();
	};

	vm.confirm = function() {
		var crontabExpression = ['0'];

		crontabExpression.push(vm.datetime.getMinutes(), vm.datetime.getHours());
		crontabExpression.push();

		if(vm.recur === 'onetime') {
			crontabExpression.push(vm.datetime.getDate(), vm.datetime.getMonth());
		} else {
			crontabExpression.push('*', '*');
		}

		if(vm.recur === 'weekly') {
			var weekdays = [];
			for(var i = 0; i < 6; i++) {
				if(vm.weekdays[i] === true) {
					weekdays.push(i);
				}
			}
			if(weekdays.length) {
				crontabExpression.push(weekdays.join(','));
			} else {
				crontabExpression.push('*');
			}
		} else {
			crontabExpression.push('*');
		}

    	$mdDialog.hide({
			mode: vm.mode,
			cronTime: crontabExpression.join(' ')
		});
  	};

});
