import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './Header.js';
import TaskList from './TaskList.js';
import TaskListItem from './TaskListItem.js';
import TaskDetails from './TaskDetails.js';
import GoogleMaps from './Map.js';
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
      <div class="ui container" style={{'padding-top': '100px'}}>
        <Header userIsLoggedIn={true} />
        <h1 class="ui center aligned header">This is the main app view</h1>
        <div class="ui stackable grid">
          <div class="four wide column">
            <TaskList tasks={this.state.tasks} />
          </div>
          <div class="twelve wide column">
            <GoogleMaps
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{height: `100%`}} />}
              containerElement={<div style={{height: `100%`}} />}
              mapElement={<div style={{height: `100%`}} />}
              tasks={this.state.tasks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
