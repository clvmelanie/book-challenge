'use strict';

describe('AboutController', function () {
  beforeEach(module('CoffeeShop'));

  var galleryService;
  var $controller;

  beforeEach(inject(function(_$controller_, GalleryService){
    $controller = _$controller_;
    galleryService = GalleryService;
  }));

  describe('Initialization', function () {
    it ('should initialize properly', function () {
      var controller = $controller('AboutController', galleryService);
      // expect(controller.images.length).toEqual(3);
      expect(controller.images).not.toEqual(null);
      expect(Array.isArray(controller.images)).toBe(true);
      expect(controller.images[0].image).toEqual("https://static.pexels.com/photos/32059/pexels-photo-large.jpg");
      expect(controller.images[0].caption).toEqual("Come enjoy our bright and calm atmosphere");
    });
  });
});
