import React form 'react';

const TaskList = (props) => (
  <div>
  <div>Task List</div>
  <ul>
    {
      props.TaskList.map((task) => (
        <TaskListItem handleClick={props.handleClick} task={task}/>
      ))
    }
  </ul>
  </div>
)

const TaskListItem = (props) => (
  <li onClick={() => {
    props.handleClick(props.task)
  }}>
    <div>{props.task.name}</div>
    <img src={props.task.image_url}/>
    <div>{props.task.description.slice(200)}</div> // show only first 200 symbols
    <div>{props.task.restrictions}</div>
  </li>
)

export default TaskList;