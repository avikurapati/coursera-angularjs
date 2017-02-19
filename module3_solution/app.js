

(function() {

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
    .service('MenuSearchService', MenuSearchService)
    .constant('AppServer', 'https://davids-restaurant.herokuapp.com')
    .directive('foundItems', FoundItemsDirective);


  MenuSearchService.$inject = ['$http', 'AppServer'];

  function MenuSearchService($http, AppServer) {

    var menuSearch = this;

    menuSearch.getMatchedMenuItems = function(searchTerm) {
      var items = $http({
        method: 'GET',
        url: (AppServer + '/menu_items.json')
      }).then(function(response) {
        var menu = response.data;
        var menuItems = _.filter(menu.menu_items, function(item) {
          return item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return menuItems;
      }).catch(function(error) {
          console.log('unexpected error - ', error);
          return [];
      });
      return items;
    };

  }

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.searchMenu = function() {
      MenuSearchService
        .getMatchedMenuItems(ctrl.searchTerm)
        .then(function(menuItems) {
          ctrl.found = menuItems;
        });
      console.log(ctrl.found);
    };
    ctrl.removeItem = function(index) {
      ctrl.found.splice(index, 1);
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'found-items.html',
      scope: {
        found: '<',
        onRemove: '&onRemove'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'dirCtrl',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {

  }

})();