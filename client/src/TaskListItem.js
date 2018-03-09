import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment-timezone';
import taskItemStyle from './TaskListItem.css';

const TaskListItem = props => {
  let style = {color: props.task.volunteers >= props.task.needed ? 'green' : 'red'};

  return (
    <div className="ui segment">
      <div>
        <div
          className="ui raised red card"
          style={{ width: '600px' }}
          >
          <div className="content">
            <div className="header">
              <Link to={{
                  pathname: `/tasks/${props.task.id}`,
                  username: props.username,
                }}
                >
                {props.task.title}
              </Link>
            </div>
            <div className="meta">
              <span className="category">Volunteer Opportunity</span>
            </div>
            <div className="description">
              {props.task.description}
            </div>
          </div>
          <div className="extra content">
            <span>
              <span
                className="none"
                onClick={() => console.log('these are props:', props.task)}
                >
                When: {moment.tz(props.task.date, props.timezoneByIP).format('ddd MMM Do, h:mma z')}</span>
              <br />
              <span
                onClick={() => props.selectLocation({lat: props.task.latitude, lng: props.task.longitude})}
                className="location"
                >
                Where: {props.task.location}
              </span>
              <br />
              <span className="none" style={style}>Volunteers: {props.task.volunteers}/{props.task.needed}</span>
            </span>

            <span className="right floated author">
              <Link to={{
                  pathname: `/orgs/${props.task.organization}`,
                  username: props.username,
                }}>
                <span>{props.task.organization}</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default TaskListItem;
