angular.module('CoffeeShop')
  .service('GalleryService', function(){
    this.getImages = function(){
      var csGallery = [
        {
          image: "https://static.pexels.com/photos/32059/pexels-photo-large.jpg",
          caption:"Come enjoy our bright and calm atmosphere"
        },
        {
          image: "https://static.pexels.com/photos/48665/pexels-photo-48665.jpeg",
          caption:"We have a mouth-watering selection of pastries made fresh daily"
        },
        {
          image: "https://static.pexels.com/photos/26806/pexels-photo-large.jpg",
          caption:"A low-key place to meet up or get some work done"

        }
      ];
      return csGallery;
    };

  });
