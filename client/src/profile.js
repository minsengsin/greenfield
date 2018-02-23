import React from 'react';
import TaskDetails from './TaskDetails.js';
import Traits from './Traits.js';
import Header from './Header.js';
import GoogleMaps from './Map.js';
import TaskList from './TaskList.js';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
      //data is array of TasksID of that user [1,2,3]
      console.log('--------', data);
      function getTasks(el) {
        return axios.get(`/tasks/${el}`);
      }
      Promise.all(data.data.map(getTasks)).then(arrayOfTasks => {
        //Promise.all([axios.get('user/1'), axios.get('user/2')])
        console.log('array of tasks: ', arrayOfTasks);
        var Tasks = [];
        arrayOfTasks.map(task => {
          Tasks.push(task.data);
        });
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
                    to="/login">
                    Back to the main page!
                  </Link>
                </div>

                <TaskList tasks={this.state.tasks} />
              </div>
            ) : (
              <div>
                <Link to="/" className="header item">
                  <h2 className="ui blue image header">
                    <div className="content" />
                  </h2>
                </Link>
                No tasks to display!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
