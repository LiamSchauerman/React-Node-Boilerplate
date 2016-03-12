var React = require('react');
var countedHelpers = require('../utils/theCountedHelpers');

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
    githubHelpers.getCounted()
    .then(function(counted)){
      console.log(counted);
    }
  },
  render: function () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        onInitiateBattle={this.handleInitiateBattle}
        playersInfo={this.state.playersInfo} />
    )
  }
});

module.exports = countedContainer;
