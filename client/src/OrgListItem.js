import React from 'react';
import {Link} from 'react-router-dom';

const OrgListItem = props => (
  <div className="ui segment">
    <div
      className="ui raised card"
      style={{ width: '600px' }}
    >
      <div className="content">
        <div className="header">
          <Link to={{
            pathname: `/orgs/${props.task.name}`,
            username: props.username,
            }}
          >
            {props.task.name}
          </Link>
        </div>
        <div className="meta">
          <span className="category">{props.task.site}</span>
        </div>
        <div className="description">
          <p>{props.task.bio}</p>
        </div>
      </div>
    </div>
  </div>
);

export default OrgListItem;