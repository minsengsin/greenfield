import React from 'react';

const Header = function(props) {
  console.log(window.sessionStorage)
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <a href="/" className="header item">Team Lyly</a>
        <a href={props.userIsLoggedIn ? '/logout' : '/login'} className="item">{props.userIsLoggedIn ? 'Logout' : 'Login'}</a>
      </div>
    </div>
  );
};

export default Header;
