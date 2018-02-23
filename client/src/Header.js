import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
  // componentWillMount() {}
  // axios.post('/login').then((data)=>{
  //   console.log('Heaaderrr user name',data)
  // })

const Header = function(props) {

  const destroySession = function(){
    axios.get('/destroySession').then((results)=>{
      console.log(results)
    })
  }

  
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        
      
        <Link to="/" className="header item">VolunTinder</Link>
        <a href={props.userIsLoggedIn ? '/login' : '/'} 
            onClick={props.userIsLoggedIn ? destroySession(): null}
            className="item">
            
            {props.name ? 'Logout' : 'Login'} </a>
        <Link to="/create" className="header item">Create</Link>
        <Link to={`/users/${props.name}`} className="header item">{props.name}</Link>

      </div>
    </div>
  );
};

export default Header;
