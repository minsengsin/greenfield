import React from 'react';
import {Link} from 'react-router-dom';

const TaskListItem = props => (
  <div class="ui raised card">
    <div class="content">
      <div class="header">
        <Link to={`tasks/${props.task.id}`}>Task title goes here</Link>
      </div>
      <div class="meta">
        <span class="category">Volunteer Oporuntity</span>
      </div>
      <div class="description">
        <p>This is a description</p>
      </div>
    </div>
    <div class="extra content">
      <div class="right floated author">
        <span>Square Org Logo Goes Here</span>
      </div>
    </div>
  </div>
);

export default TaskListItem;
