var React = require('react');
var Styles = require('../styles');

function Sidebar (props){
  console.log(props.clickedLocation)
  var location = props.clickedLocation;
  var obj = props.instagramData.filter(function ( obj ) {
    return obj.id === location;
  })[0];

  var photos =  obj.instagrams.map(function(photo){
        return(<li><img style={Styles.image} src={photo.images.standard_resolution.url}/></li>);
      });

      return (
        <div style={Styles.sidebar}><h2>{obj.name}</h2>
        <ul style={Styles.photoTable} id="imageList">{photos}</ul>
        </div>
      )

}


module.exports = Sidebar;
