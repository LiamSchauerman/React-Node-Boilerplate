var React = require('react');
var countedHelpers = require('../utils/theCountedHelpers');
var Counted = require('../components/Counted');



var countedContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      isLoading: true,
      countedInfo: [],
    }
  },
  componentDidMount: function () {
    countedHelpers.getCounted()
    .then(function(counted){
      this.setState({
          countedInfo: counted,
          isLoading: false
        })
    }.bind(this))
  },
  render: function () {
    return (
        <Counted isLoading={this.state.isLoading} countedInfo={this.state.countedInfo} />
    )
  }
});

module.exports = countedContainer;
