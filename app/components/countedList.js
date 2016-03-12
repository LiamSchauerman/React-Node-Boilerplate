var React = require('react');
var PropTypes = React.PropTypes;

function countedList(props){
  console.log(props)
  return (
    <ul>
    {props.countedInfo.map(function(counted) {
        return <div key={counted._id}>{counted.name}, {counted.age}, {counted.armed}</div>;
      })}
    </ul>
  );
}


module.exports = countedList;
