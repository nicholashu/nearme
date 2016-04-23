var React = require('react');
var Styles = require('../styles');

function Loading (props){
  if (props.hasUpdated === false){
  return (
    <h2 className="text-center"> LOADING...</h2>
  )
}else{
  return(
    <div></div>
  )
}
}


module.exports = Loading;
