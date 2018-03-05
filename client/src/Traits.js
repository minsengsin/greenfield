import React from 'react';

const Traits = function(props) {
  return (
    <ul>
      <li>Date: {props.task.date}</li>
      <li>Location: {props.task.location}</li>
      <li>Time: {props.task.time}</li>
    </ul>
  );
};

export default Traits;
