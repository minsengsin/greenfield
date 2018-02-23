import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './Header.js';
import TaskList from './TaskList.js';
import TaskListItem from './TaskListItem.js';
import TaskDetails from './TaskDetails.js';
import GoogleMaps from './Map.js';
import axios from 'axios';
import Auth from './Auth.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      status: false,
      username: Auth.username,
    };
  }

  componentWillMount() {
    axios.get(`/tasks`).then(results => {
      const tasks = results.data;
      this.setState({
        tasks,
      });
    });
    axios.get('/status').then(results => {
      if (!results.data) {
        console.log("Session doesn't exist!", results.data)
        this.props.history.push('/login') //actual redirection
      }
      this.setState({
        status: results.data
      })
    })
  }


  render() {
    return (
      <div className="ui container" style={{'paddingTop': '100px'}}>
        <Header name={this.state.username}/>
        <h1 className="ui center aligned header"><code>VolunTinder</code></h1>
        <div className="ui stackable grid">
          <div className="four wide column">
            <TaskList tasks={this.state.tasks} />
          </div>
          <script async defer src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC7t8S8b9WhSyAuT7Mr5VJaUhtDVDOUrV4&callback=initMap`}
  type="text/javascript"></script>
          <div className="twelve wide column">
            <GoogleMaps
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7t8S8b9WhSyAuT7Mr5VJaUhtDVDOUrV4&v=3.exp&libraries=geometry,drawing,places"
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

export default Home;
