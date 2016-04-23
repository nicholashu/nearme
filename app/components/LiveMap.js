var React = require('react');
var Styles = require('../styles');
var instagramHelpers = require('../utils/instagramHelpers');
var Instagrams = require('./Instagrams');


var LiveMap = React.createClass({

  getInitialState(){
    return{
      mapLoaded: false,
      map: undefined,
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.locationLoaded) {
      return true
    } else {
      return false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var self = this;
    if (!nextProps.mapLoaded){
      L.mapbox.accessToken = 'pk.eyJ1Ijoibmlja2h1IiwiYSI6IllYYVk0Z1kifQ.7DDxYjADzZo1ffQ9v7J-5A';
      var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      self.state.map = L.map('mapbox')
        .addLayer(mapboxTiles)
        .setView([nextProps.lat, nextProps.lng], 15);

      var userLoc = L.marker([nextProps.lat, nextProps.lng]).addTo(self.state.map);
    
    };
    this.setState({
      mapLoaded: true,
    })
  },


  render: function() {
    return (
      <div id='mapbox'
      style={Styles.mapbox}>
      <Instagrams
        position = {this.props.position}
        mapLoaded = {this.state.mapLoaded}
        map = {this.state.map} />
      </div>
    );
  }
});


module.exports = LiveMap;
