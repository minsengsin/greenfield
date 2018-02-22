import React from 'react';

const Header = function(props) {
  return (
    <div class="ui fixed inverted menu">
      <div class="ui container">
        // TODO: Add header item with img/logo
        <a href="/" class="header item">Team Lyly</a>
        <a href={props.userIsLoggedIn ? '/logout' : '/login'} class="item">{props.userIsLoggedIn ? 'Logout' : 'Login'}</a>
      </div>
    </div>
  );
};

export default Header;
