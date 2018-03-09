import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment-timezone';

const Traits = function(props) {
  return (
    <ul>
      <li>Organization:&nbsp;
        <Link to={{
            pathname: `/orgs/${props.task.organization}`,
            username: props.username,
          }}
        >
          {props.task.organization}
        </Link>
      </li>
      <li>Date: {moment.tz(props.task.date, props.timezoneByIP).format('ddd, MMM Do')}</li>
      <li>Time: {moment.tz(props.task.date, props.timezoneByIP).format('h:mma z')}</li>
      <li>Where: {props.task.location}</li>
    </ul>
  );
};

export default Traits;
