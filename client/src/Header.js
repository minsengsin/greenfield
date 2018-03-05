import React from 'react';
import {Link} from 'react-router-dom';

const Header = function(props) {
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <Link to="/" className="header item">
          VolunTinder
        </Link>
        <div className="right item">
          <Link to="/create" className="header item">
            Create
          </Link>
          <Link to={`/users/${props.name}`} className="item">
            {props.name}
          </Link>
          <Link to="/logout" className="item">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
