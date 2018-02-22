import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OneTask from './oneTask.js';


const TaskList = (props) => (
  <div>
  <div>Task List</div>
    <ul>
      {
        props.TaskList.map((task, i) => (
          <TaskListItem task={task} key={i}/>
        ))
      }
    </ul>
  </div>
)

const TaskListItem = (props) => (
  <div>
    <li>
      <Link to={`/tasks/${props.task.id}`}>
        
        <div>{props.task.title}</div>
        
      </Link>
    </li>
  </div>
)



export default TaskList;
