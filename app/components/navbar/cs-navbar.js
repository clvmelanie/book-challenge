angular.module('CoffeeShop')
  .directive('csNavbar', function() {
    return {
      scope: {},
      replace: true,
      restrict: 'E',
      templateUrl: 'components/navbar/cs-navbar.html',
      controller: function() {
        this.navItems = [
          {
            name: 'About',
            path: '/about'
          },
          {
            name: 'Menu',
            path: '/menu'
          },
          {
            name: 'Contact',
            path: '/contact'
          }
        ];
      },
      controllerAs: 'navbarCtrl'
    }
  });
