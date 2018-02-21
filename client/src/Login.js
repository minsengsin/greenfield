import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './Signup.js';

class Login extends React.Component {
  render() {
    return (
      <div>
	      <h2>Login</h2>
		    <form action="/login" method="post">
		      <div>
		        <label for="username">Username:</label>
		        <input id="username" type="text" name="username"></input>
		      </div>
		      <div>
		        <label for="password">Password:</label>
		        <input id="password" type="password" name="password"></input>
		      </div>
		      <div>
		        <input type="submit" value="Login"></input>
		      </div>
		    </form>
	      <p>
	        <Link to="/signup"><button>Create an Account &rarr;</button></Link>
	      </p>

      </div>
    )
  }
}


export default Login;
