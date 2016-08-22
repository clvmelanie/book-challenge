angular.module('CoffeeShop')
  .service('ItemService', function(){
    this.getDrinks = function(){
      var drinks = [
        {
          name: 'Mocha',
          price: 4.25
        },
        {
          name: 'Latte',
          price: 4
        },
        {
          name: 'Americano',
          price: 3
        },
        {
          name: 'Hot Tea',
          price: 2
        }
      ];
      return drinks;
    };

  });
