var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require("../components/Home");
var countedContainer = require("../containers/countedContainer");




var routes = (
 <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={countedContainer} />
    </Route>
  </Router>
);

module.exports = routes;
