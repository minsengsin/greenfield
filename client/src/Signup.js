import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './Login.js';
import './signup.css';

class Signup extends React.Component {
  render() {
    return (
      <div className="ui container" style={{paddingTop: '100px'}}>
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{maxWidth: '450px'}}>
            <h2 className="ui blue image header">
              <div className="content">Sign-up for VolunTinder</div>
            </h2>
            <form className="ui large form" action="/signup" method="post">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <label htmlFor="username" />
                    <input
                      type="text"
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <label htmlFor="password" />
                    <input
                      type="password"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Signup"
                  className="ui fluid large blue submit button"
                />
              </div>
              <div className="ui error message" />
            </form>
            <div className="ui message">
              <Link className="ui fluid large blue submit button" to="/login">
                Already registered? Login here!
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
