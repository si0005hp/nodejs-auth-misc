import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import auth0 from './auth0-util';
import Main from './Main';

const App = () => {
  return (
    <div id="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/callback" component={auth0.loginCallback} />
        <Route exact path="/main" render={withAuth(Main)} />
        <Redirect to="/main" />;
      </Switch>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const withAuth = Component => props =>
  auth0.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />;

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
