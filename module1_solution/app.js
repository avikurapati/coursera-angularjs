/* global _ */

(function() {
	'use strict';

	angular.module('LunchCheck', [])
		.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {

		$scope.remarks = '';
		$scope.checkLunchItems = function() {
			var lunchItemsArray = $scope.lunchItems.split(',');
			lunchItemsArray = _.filter(lunchItemsArray, function(lunchItem) {
				return lunchItem.trim() !== '';
			});
			if (lunchItemsArray.length > 3) {
				$scope.remarks = "Too much!";
			} else if (lunchItemsArray.length === 0) {
				$scope.remarks = "Please enter data first";
			} else {
				$scope.remarks = "Enjoy!";
			}
		};
	}

})();