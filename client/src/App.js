import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Login from './Login.js';
import Signup from './Signup.js';
import TaskDetails from './TaskDetails.js';
import Profile from './profile.js';
import Home from './Home.js';
import Create from './create.js';
import Auth from './Auth.js';

// For [fake] auth, taken from
// https://tylermcginnis.com/react-router-protected-routes-authentication/
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// This should make sense, even if you don't know that much about React Router.
class App extends Component {
  render() {
    return (
      <div>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/tasks/:taskId" component={TaskDetails} />
        <PrivateRoute path="/users/:username" component={Profile} />
        <Route path="/create" component={Create} />
      </div>
    );
  }
}

export default App;
