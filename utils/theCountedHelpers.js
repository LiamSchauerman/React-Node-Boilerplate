var axios = require('axios');


var helpers = {
  getCounted: function () {
    return axios.get('http://www.thecountedapi.com/api/counted')
    .catch(function (err) {console.warn('Error in getPlayersInfo: ', err)})
  },
};

module.exports = helpers;
