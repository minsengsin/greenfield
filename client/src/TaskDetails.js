import React from 'react';
import ReactDOM from 'react-dom';
import sampleText from './SampleText.js'

// const Paragraph = ({ task: taskDescription }) {
class TaskDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      task: props.task
    }
  }

  render(){
    return(
      <div>
      <a href="#" className="button">Apply!</a>
      <p>{this.state.task}</p>
      </div>
    );
  }
}

export default TaskDetails;