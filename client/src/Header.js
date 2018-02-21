import React from 'react';
import ReactDOM from 'react-dom';

const Header = function(props) {
  return (
    <div>
      <h1>Team Lyly</h1>
      <button href={props.userIsLoggedIn ? '/logout' : '/login'}>{props.userIsLoggedIn ? 'HeaderLogout!' : 'HeaderLogin!'}</button>
    </div>
  );
}

// Header.defaultProps = {userIsLoggedIn: false};
// Header.propTyes = {userIsLoggedIn: React.PropTypes.boolean};

export default Header;
