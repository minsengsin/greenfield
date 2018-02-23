import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import Login from './Login.js';
import Signup from './Signup.js';
import mainPage from './mainPage.js';
import OneTask from './oneTask.js';
import sampleText from './SampleText.js';
import TaskDetails from './TaskDetails.js';
import Traits from './Traits.js';
import Profile from './profile.js';
import Home from './Home.js';
import Create from './create.js';
import axios from 'axios';
import Auth from './Auth.js';

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

class App extends Component {
  render() {
    return (
      <div>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/tasks/:taskId" component={TaskDetails} />
        <Route path="/users/:username" component={Profile} />
        <Route path="/create" component={Create} />
      </div>
    );
  }
}

export default App;
