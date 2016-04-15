angular.module('PhmWebApp').controller('NewScheduleDialogController', function($mdDialog) {
	'use strict';

	var vm = this;

	vm.time = new Date();

	vm.cancel = function() {
		$mdDialog.cancel();
	};

	vm.confirm = function() {
    	$mdDialog.hide('data');
  	};

});
