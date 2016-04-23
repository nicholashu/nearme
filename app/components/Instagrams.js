var React = require('react');
var token = "11734572.1677ed0.3e5d730abe2d4ca1957eae68e7c0aef1";
var async = require("async");
var Sidebar = require('./Sidebar');
var Styles = require('../styles');

var Instagrams = React.createClass({

    getInitialState: function() {
      return {
        instagramData: [],
        map: undefined,
        renderSidebar: false
      };
    },

    renderSidebar: function(e){
        this.setState({
          clickedLocation: e.target.LocationId,
          renderSidebar: true,
        })
    },

    componentWillReceiveProps: function(nextProps) {
      self = this;
      if (nextProps.mapLoaded) {
        var coords = nextProps.position;
        var instagramObjects;
        var apiUrl = "https://api.instagram.com/v1/locations/search?lat=" + coords.latitude + "&lng=" + coords.longitude + "&access_token=" + token;
        //function to pull location ID from init Insta call
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: apiUrl
        }).then(function(locationIds) {
            var promises = $.map(locationIds.data, function(location) {
                var apiUrl = "https://api.instagram.com/v1/locations/" + location.id + "/media/recent?access_token=" + token;
                return $.ajax({
                  type: "GET",
                  dataType: "jsonp",
                  url: apiUrl
                }).then(function(instagramObjects) {
                  if (instagramObjects.data){
                    location.instagrams = instagramObjects.data;
                  return location;
                }
                });
            });
            $.when.apply(null, promises).then(function() {
                self.setState({
                  instagramData: locationIds.data,
                  map: nextProps.map
                });
            });
        });
} //if end
},//component end,

componentDidUpdate(prevProps, prevState) {

    var self = this;
    if (prevProps.mapLoaded){
      console.log("map loaded")
      this.state.instagramData.map(function(location){
        if(location.instagrams){
          var photoUrls = location.instagrams.map(function(instagrams){
            return ("<li><img src='" + instagrams.images.standard_resolution.url + "'></li>");
          })
            var POI = L.marker([location.latitude, location.longitude]).addTo(self.state.map);
            POI.LocationId = location.id;
            POI.bindPopup(location.name +"<ul>"+  "</ul>").on('click', self.renderSidebar);
        }
      })
    }
  },

  //photoUrls.map(function(listItem){return listItem })+

  render: function() {

    if (this.state.renderSidebar){
      return (
        <Sidebar style = {Styles.sidebar}
          clickedLocation={this.state.clickedLocation}
          instagramData={this.state.instagramData}
        />
      )
    }

    return ( <div>
      </div>
    );
  }
});

module.exports = Instagrams;
