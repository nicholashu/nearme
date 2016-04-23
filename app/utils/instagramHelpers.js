//CURRENTLY NOT IN USE
//APP USES INSTAGRAM COMPONENT


var token = "11734572.1677ed0.3e5d730abe2d4ca1957eae68e7c0aef1";
var location;
var isUpdated = false;


function getInstagrams(position, callback) {
  var coords = position;
  var apiUrl = "https://api.instagram.com/v1/locations/search?lat=" + coords.latitude + "&lng=" + coords.longitude + "&access_token=" + token;
  //function to pull location ID from init Insta call
  $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      async: false,
      url: apiUrl
    })
    .done(function(locationIds) {
      var instagramObject = locationIds.data.map(function(location) {
        var instagramArray = [];
        var apiUrl = "https://api.instagram.com/v1/locations/" + location.id + "/media/recent?access_token=" + token;
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            async: false,
            url: apiUrl
          })
          .done(function(result) {
            instagramArray.push(result.data);
          });
        return {
          name: location.name,
          lat: location.latitude,
          lng: location.longitude,
          id: location.longitude,
          instagrams: instagramArray
        };
      });

      return callback(instagramObject);
    }
);

}

function returnArray(data){
  return data;
}

var helpers = {
  getInstagramData: function(position) {
    return getInstagrams(position,returnArray);
  },
  getGeoCoords: function() {
    if (isUpdated) {
      console.log(location);
    }

  }
};

module.exports = helpers;
