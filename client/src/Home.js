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
  }

  componentWillMount() {
    axios.get(`/tasks`,{
      params: {
        radius: 5,
      }
    }).then(results => {
      const tasks = results.data;
      this.setState({
        tasks,
      }, () => console.log('\nthis is tasks in home\n', this.state.tasks));
    });

    axios.get('http://ip-api.com/json')
      .then((res) => {
        this.setState({
          latByIP: res.data.lat,
          lngByIP: res.data.lon,
          zipByIP: res.data.zip,
          timezoneByIP: res.data.timezone,
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

  selectLocation(loc) {
    if (this.state.mapCenter) {
      this.setState({
        mapCenter: '',
        mapZoom: '',
      }, () => {
        setTimeout(() => {
          this.setState({
            mapCenter: loc,
            mapZoom: 16,
          });
        }, 1000);
      });
    } else {
      this.setState({
        mapCenter: loc,
        mapZoom: 16,
      });
    }
  }

  render() {
    var taskList = this.state.tasks.slice();
    taskList=taskList.filter(t=>t.completed === false)
    return (
      <div
        onClick={(e) => {
          console.log(e.target.className);
          if (e.target.className && e.target.className !== 'location') {
            this.setState({ mapCenter: '', mapZoom: '' })
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
                />
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
              mapCenter={
                {
                  lat: this.state.latByIP,
                  lng: this.state.lngByIP,
                }
              }
              mapZoom={this.state.mapZoom}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
