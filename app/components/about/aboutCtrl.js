angular.module('CoffeeShop')
.controller('AboutController', function(GalleryService){
  this.images = GalleryService.getImages();
});
