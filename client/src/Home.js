import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './Header.js';
import TaskList from './TaskList.js';
import TaskListItem from './TaskListItem.js';
import TaskDetails from './TaskDetails.js';
import GoogleMaps from './Map.js';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      status: false,
      username: ''

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
        this.props.history.goBack() //actual redirection
      }
      this.setState({
        status: results.data
      })
    })
    axios.post('/username').then(results=>{
      this.setState({
        username: results.data
      })
    })
  }


  render() {
    return (
      <div className="ui container" style={{'paddingTop': '100px'}}>
        <Header userIsLoggedIn={this.state.status} name={this.state.username}/>
        <h1 className="ui center aligned header">This is the main app view</h1>
        <div className="ui stackable grid">
          <div className="four wide column">
            <TaskList tasks={this.state.tasks} />
          </div>
          <div className="twelve wide column">
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

export default Home;
