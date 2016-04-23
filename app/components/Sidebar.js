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
        <div class="mdl-card mdl-shadow--4dp">
        <div class="mdl-card__media"><img src="skytower.jpg" width="173" height="157" border="0"
         alt="" style="padding:10px;">
        </div>
        <div class="mdl-card__supporting-text">
          Auckland Sky Tower, taken March 24th, 2014
        </div>
        <div class="mdl-card__supporting-text">
        The Sky Tower is an observation and telecommunications tower located in Auckland,
        New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
        in the Southern Hemisphere.
        </div>
      </div>
        </div>
      )

}


module.exports = Sidebar;
