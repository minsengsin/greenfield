import React from 'react';
import ReactDOM from 'react-dom';
import sampleText from './SampleText.js';
import Header from './Header.js';
import Traits from './Traits.js';
import axios from 'axios';

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.taskId);

    this.state = {
      task: props.task,
      taskId: props.match.params.taskId,
    };
  }

  componentDidMount() {
    // Get the task info from the API
    console.log('Running?');
    axios.get(`/tasks/${this.state.taskId}`).then(result => {
      console.log('results', result);
      this.setState({task: result.data});
    });
  }

  displayButtonPostResult(isAccepted) {
    console.log('called');
    if (isAccepted) {
      alert('Task has been accepted!');
    } else {
      alert('Task has been rejected!');
    }
  }

  acceptTask(e) {
    console.log('accepting task');
    console.log(this.state);
    axios.post(`/tasks/${this.state.taskId}/accept`).then(res => {
      // Based on res, figure out whether task has been accepted or not.
      this.displayButtonPostResult(true);
    });
  }

  rejectTask(e) {
    console.log('rejecting task');
    axios.post(`/tasks/${this.state.taskId}/reject`).then(res => {
      // Based on res, figure out whether task has been accepted or not.
      this.displayButtonPostResult(false);
    });
  }

  render() {
    return (
      <div className="ui container" style={{paddingTop: '100px'}}>
        <Header userIsLoggedIn={true} />

        <div className="ui stackable grid">
          <div className="twelve wide column">
            <div class="ui segment">
              <h1 class="ui center aligned header">
                {this.state.task ? this.state.task.title : 'Loading'}
              </h1>
              <div class="ui text container fluid">
                <p>
                  {this.state.task ? this.state.task.description : 'Loading'}
                </p>

                <div class="ui center aligned attached segment">
                  <div class="ui buttons">
                    <button
                      onClick={this.rejectTask.bind(this)}
                      className="ui button">
                      Cancel
                    </button>
                    <div class="or" />
                    <button
                      onClick={this.acceptTask.bind(this)}
                      className="ui positive button">
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div class="ui segment">
              <h3>Extra Info</h3>
              {this.state.task ? <Traits task={this.state.task} /> : 'Loading'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskDetails;
