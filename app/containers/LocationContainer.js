var React = require('react');

var LocationContainer = React.createClass({


  getInitialState: function() {
    return {
      lat: 0,
      lng: 0,
      isUpdated: false
    };
  },

  componentDidMount: function () {
    var self = this;
    function useGeoData(position){
      self.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
    };

    function requestCurrentPosition(){
        if (navigator.geolocation)
        {
        navigator.geolocation.getCurrentPosition(useGeoData);
        }
      }

      requestCurrentPosition();
  },

  render: function() {
      return (
        <div/>
      )
  }

});

module.exports = LocationContainer;
