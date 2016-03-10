
var React = require('react');
var Link = require('react-router').Link
var MainContainer = require('../containers/MainContainer');


var Hello = React.createClass({
  render: function () {
    return (
      <MainContainer>
          <h1>Hello World</h1>
          <p className='lead'>React Boilerplate</p>
      </MainContainer>
    )
  }
});

module.exports = Hello;
