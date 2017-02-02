/* global angular */

(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];

	function ToBuyController(ShoppingListCheckOffService) {
		var buy = this;
		buy.buyItem = ShoppingListCheckOffService.buy;
		buy.toBuyItems = ShoppingListCheckOffService.toBuyItems;
		buy.isToBuyEmpty = ShoppingListCheckOffService.isToBuyEmpty;
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var bought = this;
		bought.boughtItems = ShoppingListCheckOffService.boughtItems;
		bought.isBoughtEmpty = ShoppingListCheckOffService.isBoughtEmpty;
	}

	function ShoppingListCheckOffService() {
		var service = this;
		service.toBuyItems = [{ name: "cereal", quantity: 1 },
							{ name: "chips", quantity: 10 },
							{ name: "apples", quantity: 10 },
							{ name: "chocolates", quantity: 5 },
							{ name: "milk", quantity: 1 }];
		service.boughtItems = [];
		service.buy = function(index) {
			var boughtItem = service.toBuyItems.splice(index, 1);
			service.boughtItems.push.apply(service.boughtItems, boughtItem);
		};
		service.isToBuyEmpty = (service.toBuyItems.length === 0);
		service.isBoughtEmpty = (service.boughtItems.length === 0);
	}

})();