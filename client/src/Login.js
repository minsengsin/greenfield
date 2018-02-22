import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './Signup.js';
import './signup.css'

class Login extends React.Component {
	render() {
		return (
			<div className="ui container" style={{'paddingTop': '100px'}}>
			<div className="ui middle aligned center aligned grid">
				<div className="column">
					<h2 className="ui blue image header">
						<div className="content">
							Log-in to VolunTinder
							</div>
					</h2>
					<form className="ui large form" action="/login" method="post">
						<div className="ui stacked segment">
							<div className="field">
								<div className="ui left icon input">
								<label htmlFor="username"></label>
                <input type="text" id="username" type="text" name="username" placeholder="Username"></input>
								</div>
							</div>
							<div className="field">
								<div className="ui left icon input">
								<label htmlFor="password"></label>
                 <input type="password" id="password" type="password" name="password" placeholder="Password"></input>
								</div>
							</div>
							<input type="submit" value="Login" className="ui fluid large blue submit button"></input>
						</div>
						<div className="ui error message"></div>
					</form>
					<div className="ui message">
					<Link className="ui fluid large blue submit button" to="/signup">New Volunteer? Register NOW!</Link>
					</div>
				</div>
			</div>
			</div>
		)
	}
}

export default Login;
