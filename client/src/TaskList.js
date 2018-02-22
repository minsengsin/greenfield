import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import OneTask from './oneTask.js';
import TaskListItem from './TaskListItem.js';

//const TaskListItem = (props) => (
//<div>
//<li>
//<Link to={`/tasks/${props.task.id}`}>
//<div>Tasks</div>
//</Link>
//</li>
//</div>
//)

const TaskList = props => {
  console.log(props.tasks);
  return (
    <div className="ui segments">
      {props.tasks.map((task, i) => <TaskListItem task={task} key={i} />)}
    </div>
  );
};

export default TaskList;
