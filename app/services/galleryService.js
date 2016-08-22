angular.module('CoffeeShop')
  .service('GalleryService', function(){
    this.getImages = function(){
      var csGallery = [
        {
          image: "https://static.pexels.com/photos/32059/pexels-photo-large.jpg",
          caption:"Come and enjoy our bright and calm atmosphere"
        },
        {
          image: "https://static.pexels.com/photos/48665/pexels-photo-48665.jpeg",
          caption:"We have a large selection of pastries made fresh daily"
        },
        {
          image: "https://static.pexels.com/photos/6357/coffee-cup-desk-pen-large.jpg",
          caption:"A great place to get some work done"

        }
      ];
      return csGallery;
    };

  });
