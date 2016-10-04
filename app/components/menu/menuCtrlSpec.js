'use strict';

describe('MenuController', function () {
  beforeEach(module('CoffeeShop'));

  var itemService;
  var $controller;

  beforeEach(inject(function(_$controller_, ItemService){
    $controller = _$controller_;
    itemService = ItemService;
  }));

  describe('Initialization', function () {
    it ('should initialize properly', function () {
      var controller = $controller('MenuController', itemService);
      expect(controller.drinks).not.toEqual(null);
      expect(Array.isArray(controller.drinks)).toBe(true);
      expect(controller.drinks[0].name).toEqual("Mocha");
      expect(controller.drinks[0].price).toEqual(4.25);
    });
  });
});
