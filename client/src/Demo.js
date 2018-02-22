import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './Header.js';
import TaskList from './TaskList.js';
import TaskListItem from './TaskListItem.js';
import TaskDetails from './TaskDetails.js';
import axios from 'axios';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentWillMount() {
    axios.get(`/tasks`).then(results => {
      const tasks = results.data;
      this.setState({
        tasks,
      });
    });
  }

  render() {
    return (
      <div class="ui container">
        <Header userIsLoggedIn={true} />
        <div class="ui main text container" style={{'padding-top': '100px'}}>
          <h1 class="ui center aligned header">This is the main app view</h1>
          <div class="middle center aligned padded grid">
            <div class="row">
              <div class="four wide column">
                <TaskList tasks={this.state.tasks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
