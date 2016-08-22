angular.module("CoffeeShop")
.controller('MenuController', function(ItemService){
  this.drinks = ItemService.getDrinks();
});
