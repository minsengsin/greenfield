import React from 'react';
import Header from './Header.js';
import TaskList from './TaskList.js';
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
      mapCenter: null,
      mapZoom: 11,
      latByIP: null,
      lngByIP: null,
      zipByIP: null,
      timezoneByIP: null,
      radius: 5,
    };
    this.selectLocation = this.selectLocation.bind(this);
    this.getTasks = this.getTasks.bind(this);
  }

  componentWillMount() {
    axios.get('http://ip-api.com/json')
      .then((res) => {
        console.log(res.data.lat);
        this.setState({
          latByIP: res.data.lat,
          lngByIP: res.data.lon,
          mapCenter: {lat: res.data.lat, lng: res.data.lon},
          zipByIP: res.data.zip,
          timezoneByIP: res.data.timezone,
        }, ()=> {
          this.getTasks();
          console.log('this is the timezone: ', this.state.timezoneByIP);
          Auth.timezoneByIP = this.state.timezoneByIP;
        });
      })
      .catch((err) => {
        console.log('ERROR in axios.get to ip-api, error: ', err);
      });

    axios.get('/status').then(results => {
      if (!results.data) {
        console.log("Session doesn't exist!", results.data);
        this.props.history.push('/login'); //actual redirection
      }
      this.setState({
        status: results.data,
      });
    });
  }

  getTasks() {
    console.log('gettttt');
    axios.get(`/tasks`,{
      params: {
        radius: this.state.radius,
        zip: this.state.zipByIP,
      }
    }).then(results => {
      const tasks = results.data;
      this.setState({
        tasks,
      }, () => console.log('\nthis is tasks in home\n', this.state.tasks));
    });
  }

  selectLocation(loc) {
    this.setState({
      mapCenter: loc,
      mapZoom: 16,
    });
  }

  render() {
    var taskList = this.state.tasks.slice();
    taskList=taskList.filter(t=>t.completed === false)
    return (
      <div
        onClick={(e) => {
          console.log(e.target.className);
          if (e.target.className && e.target.className !== 'location') {
            this.setState({mapZoom: 11 })
          }
        }}
        className="ui container"
        style={{paddingTop: '50px'}}
      >
        <Header name={this.state.username} />
        <div
          className="ui stackable grid"
        >
          <div
            className="six wide column"
            style={{ }}
          >
            <div className="ui segment" style={{ height: '20px', padding: '0px' }}>
              Sort
            </div>
            <div style={{ height: '80vh', transform: 'scaleX(-1)', overflowY: 'scroll' }}>
              <div style={{ transform: 'scaleX(-1)' }}>
                <TaskList
                  username={this.state.username}
                  tasks={taskList}
                  selectLocation={this.selectLocation}
                  timezoneByIP={this.state.timezoneByIP}
                />
                <button
                  onClick={() => {
                    this.setState({
                      radius: this.state.radius += 1
                    }, this.getTasks);
                  }}
                  class="ui button fluid blue"
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
          <script
            async
            defer
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBH-6-MO2reXrAZ4fDQuzkOghyIBPkLyhE&callback=initMap`}
            type="text/javascript"
          />
          <div
            className="ten wide column map"
            //style={{ height: '80%' }}
          >
            <GoogleMaps
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBH-6-MO2reXrAZ4fDQuzkOghyIBPkLyhE&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{height: `100%`}} />}
              containerElement={<div style={{height: `100%`}} />}
              mapElement={<div style={{height: `100%`}} />}
              tasks={this.state.tasks}
              mapCenter={this.state.mapCenter}
              mapZoom={this.state.mapZoom}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
