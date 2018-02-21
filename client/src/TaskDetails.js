import React from 'react';
import ReactDOM from 'react-dom';
import sampleText from './SampleText.js';
import Header from './Header.js';
import axios from 'axios';

// const Paragraph = ({ task: taskDescription }) {
class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.taskId);
    this.state = {
      taskId: props.match.params.taskId,
    };
  }

  componentWillMount() {
    // Get the task info from the API
    axios.get(`/tasks/${this.state.taskId}`).then(result => {
      this.setState((prevState, props) => {
        console.log('Successfully fetched!', result);
        return {task: result.data};
      });
    });
  }

  render() {
    return (
      <div class="ui main text container">
        <h1 class="ui header">Task Title: {`this.state.task.title`}</h1>
        <Header userIsLoggedIn={true} />
        <a href={`/tasks/${this.state.taskId}`} className="button">
          Apply!
        </a>
      </div>
    );
  }
}

export default TaskDetails;
