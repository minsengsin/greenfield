import React from 'react';
import Header from './Header.js';
import TaskList from './TaskList.js';
import GoogleMaps from './Map.js';
import axios from 'axios';
import Auth from './Auth.js';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
      newAddress: null,
    };
    this.selectLocation = this.selectLocation.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.handleNewAddress = this.handleNewAddress.bind(this);
    this.submitNewAddress = this.submitNewAddress.bind(this);
    this.getDistances = this.getDistances.bind(this);
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
        }, this.getDistances);
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

  handleNewAddress(address) {
    this.setState({
      newAddress: address,
    });
  }

  getDistances() {
    axios.get('/user/zip', {
      params: {
        username: this.state.username,
      }
    }).then((userData) => {
      console.log(userData.data.zip, this.state.zipByIP);
      if (userData.data.zip != this.state.zipByIP) {
        if (typeof(Number.prototype.toRadians) === "undefined") {
          Number.prototype.toRadians = function() {
            return this * Math.PI / 180;
          }
        }
        console.log('getting distance');
        axios.get('tasks/all').then(taskData => {
          let userTaskDist = [];
          taskData.data.forEach(t => {

            var R = 6371e3; // metres
            var φ1 = Number(this.state.latByIP).toRadians();
            var φ2 = Number(t.latitude).toRadians();
            var Δφ = Number(t.latitude-this.state.latByIP).toRadians();
            var Δλ = Number(t.longitude-this.state.lngByIP).toRadians();

            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            var d = R * c;

            userTaskDist.push({
              userId: userData.data.id,
              taskId: t.id,
              distance: d,
            });
          })
          axios.post('/userTaskDist', {
            dataArr: userTaskDist,
          })
        })

        axios.post('/user/zip', {
          username: this.state.username,
          zip: this.state.zipByIP,
        })
      }
    })
    this.getTasks();
    Auth.timezoneByIP = this.state.timezoneByIP;
  }

  getTasks() {
    console.log('gettttt');
    axios.get(`/tasks`,{
      params: {
        radius: this.state.radius,
        username: this.state.username,
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

  submitNewAddress(e) {
    if (e.keyCode === 13) {
      console.log('newAddress')
      var zip = ''
      geocodeByAddress(this.state.newAddress)
        .then((results) => {
          let last = results[0].address_components.length - 1;
          zip = results[0].address_components[last].short_name
          //console.log(results[0].address_components[last]);
          return getLatLng(results[0]);
        })
        .then(({ lat, lng }) => {
          this.setState({
            latByIP: lat,
            lngByIP: lng,
            zipByIP: zip,
            radius: 1,
          }, this.getDistances);
        })
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

            <div className="ui large form" style={{ height: '20px', paddingBottom: '50px' }}>
              <div className="field">
                <div
                  className="ui left input"
                  style={{zIndex: 1}}
                  >
                  <label htmlFor="location" />
                  <style>
                    {
                      `#PlacesAutocomplete__root {
                        width: 100%;
                        text-align: left;
                      }
                      `
                    }
                  </style>
                  <PlacesAutocomplete
                    inputProps={{
                      value: this.state.newAddress,
                      onChange: this.handleNewAddress,
                      onKeyUp: this.submitNewAddress,
                      placeholder: 'Update Your Address',
                      debounce: '100',
                    }}
                    />
                </div>
              </div>
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
