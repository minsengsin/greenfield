import React from 'react';
import axios from 'axios';

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
        
        <a href="/" className="header item">VolunTinder</a>
        
        <a href={props.userIsLoggedIn ? '/login' : '/'} 
            onClick={props.userIsLoggedIn ? destroySession(): null}
            className="item">
            
            {props.name ? 'Logout' : 'Login'} </a>

            <a className="item">{props.name}</a>
      </div>
    </div>
  );
};

export default Header;
