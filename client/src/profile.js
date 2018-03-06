import React from 'react';
import TaskList from './TaskList.js';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentWillMount() {
    console.log(this.props.match.params.username);
    axios.get(`/users/${this.props.match.params.username}`).then(data => {
      console.log('--------', data);
      function getTasks(el) {
        return axios.get(`/tasks/${el}`);
      }
      Promise.all(data.data.map(getTasks)).then(arrayOfTasks => {
        console.log('array of tasks: ', arrayOfTasks);
        var Tasks = [];
        arrayOfTasks.map(task => Tasks.push(task.data));
        console.log('----TASKS---- ', Tasks);
        this.setState({
          tasks: Tasks,
        });
      });
    });
  }

  render() {
    return (
      <div className="ui container" style={{paddingTop: '25px'}}>
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{maxWidth: '350px'}}>
            {this.state.tasks.length > 0 ? (
              <div>
                <div className="ui message">
                  <Link
                    className="ui fluid large blue submit button"
                    to="/">
                    Back to the main page!
                  </Link>
                </div>

                <TaskList tasks={this.state.tasks} />
              </div>
            ) : (
              <div>
                No tasks to display! <br />
                <Link to="/" className="header item">
                  <h2 className="ui blue image header">
                    Back to the main page!
                    <div className="content" />
                  </h2>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
