import React from 'react';
import TaskListItem from './TaskListItem.js';

const TaskList = props => {
  console.log(props.tasks);
  return (
    <div className="ui segments">
      {props.tasks.map((task, i) => <TaskListItem task={task} key={i} />)}
    </div>
  );
};

export default TaskList;
