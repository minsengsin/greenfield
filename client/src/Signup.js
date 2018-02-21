import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Signup extends React.Component {
  render() {
    return (

      <div>

      <h2>Sign up</h2>
      <form action="/signup" method="post">
          <div>
            <label for="username">Username:</label>
            <input id="username" type="text" name="username"></input>
          </div>
          <div>
            <label for="password">Password:</label>
            <input id="password" type="password" name="password"></input>
          </div>
          <div>
            <input type="submit" value="Sign up"></input>
          </div>
      </form>
      <p>
        <Link to="/login"><button>Login to your account &rarr;</button></Link>

      </p>

      </div>
    )
  }
}


export default Signup;
