import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import oneTask from './oneTask.js'


const TaskList = (props) => (
  <div>
  <div>Task List</div>
  <ul>
    {
      props.TaskList.map((task, i) => (
        <TaskListItem handleClick={props.handleClick} task={task} key={i}/>
      ))
    }
  </ul>
  </div>
)

const TaskListItem = (props) => (
  <div>
    <li onClick={() => {props.handleClick(props.task)}}>
      <Link to="/task">
        // <div>{props.task.name}</div>
        <div><h1>EACH THING</h1></div>
      </Link>
    </li>
  </div>
)




export default TaskList;
