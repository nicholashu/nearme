var React = require('react');
var Main = require('../components/Main');
var LiveMap = require('../components/LiveMap');
var Loading = require('../components/Loading');
var Instagrams = require('../components/Instagrams');
var instagramHelpers = require('../utils/instagramHelpers');
var Styles = require('../styles');


var MapContainer = React.createClass({

  getInitialState: function() {
    return {
      position: {},
      lat: 0,
      lng: 0,
      locationLoaded: false,
      instagramData: []
    };
  },

  getLocation: function(){
    var self = this;
    function useGeoData(position){
        self.setState({
          position: {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
          },
          lat:position.coords.latitude,
          lng:position.coords.longitude,
          locationLoaded: true,
        });
        ;
    };

    function requestCurrentPosition(){
        if (navigator.geolocation)
        {
        navigator.geolocation.getCurrentPosition(useGeoData);
        }
      }

    requestCurrentPosition();
  },

  componentWillMount: function() {
    this.getLocation()
  },


  render: function() {
    return (
      <div>
      <Loading
        hasUpdated = {this.state.locationLoaded}/>
      <LiveMap
        position = {this.state.position}
        lat = {this.state.lat}
        lng = {this.state.lng}
        instagramData = {this.state.instagramData}
        locationLoaded = {this.state.locationLoaded}/>
      </div>
    );
  }
});

module.exports = MapContainer;
