import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './signup.css';
import Header from './Header.js';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import 'react-datepicker/dist/react-datepicker.css';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
      orgs: [],
      organization: '',
      title: '',
      description: '',
      currentAddress: null,
      currentAddressLat: null,
      currentAddressLng: null,
      dateTime: null,
      needed: '',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOrg = this.handleOrg.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleNeeded = this.handleNeeded.bind(this);
  }

  componentWillMount() {
    axios.get(`/orgs/user/${this.state.username}`).then(results => {
      console.log(results)
      const orgs = results.data.map(r => r.name);
      this.setState({
        orgs,
      });
    });
  }

  handleAddressChange(address) {
    this.setState({
      currentAddress: address,
    });
  }

  handleDateChange(date) {
    this.setState({
      dateTime: date,
    }, () => {
      console.log('formatted dateTime: ', this.state.dateTime.format('YYYY-MM-DD HH:mm'));
    });
  }

  handleCreate() {
    geocodeByAddress(this.state.currentAddress)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        axios.post('/tasks', {
          organization: this.state.organization,
          location: this.state.currentAddress,
          title: this.state.title,
          description: this.state.description,
          needed: this.state.needed,
          latitude: lat,
          longitude: lng,
          dateTime: this.state.dateTime.format('YYYY-MM-DD HH:mm'),
        })
          .then(() => {
            this.props.history.push('/');
          })
          .catch((err) => {
            console.log('ERROR in handleCreate(), error: ', err);
          });
      })
  }

  // If this looks redundant, it's because it is.
  // During Solo Week I learned how to handle simple form/state updates with
  // arrow functions. I'll leave that up to the inheriter of this code to
  // figure out.
  // handleTime(e) {
  //   this.setState({
  //     time: e.target.value,
  //   });
  // }

  handleOrg(e) {
    if(e.target.selectedIndex > 1){
      this.setState({
        organization: e.target.options[e.target.selectedIndex].text,
      });
    } else if (e.target.selectedIndex === 1) {
      this.props.history.push(`/createOrg/${this.state.username}`);
    }
  }

  handleDesc(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  handleNeeded(e) {
    this.setState({
      needed: e.target.value
    });
  }

  render() {
    console.log('in create', this.props.location.param1);
    return (
    <div>
      <Header name={this.state.username}/>
      <div className="ui container" style={{paddingTop: '100px'}}>
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{maxWidth: '450px'}}>
            <h2 className="ui blue image header">
              <div className="content">Create new task</div>
            </h2>

            <div className="ui large form">
              <div className="ui stacked segment">

                <div className="field">
                  <select
                    className="ui search dropdown"
                    onChange={e => {this.handleOrg(e)}}
                    >
                    <option>Organization</option>
                    <option>Create New Organization</option>
                    {this.state.orgs.map(m => <option>{m}</option>)}
                  </select>
                </div>

                <div className="field">
                  <div className="ui left input">
                    <label htmlFor="title" />
                    <input
                      value={this.state.title}
                      onChange={e => {this.handleTitle(e)}}
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      />
                  </div>
                </div>

                <div className="field">
                  <div className="ui left input">
                    <label htmlFor="description" />
                    <input
                      value={this.state.description}
                      onChange={e => {this.handleDesc(e)}}
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Description"
                    />
                  </div>
                </div>

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
                          value: this.state.currentAddress,
                          onChange: this.handleAddressChange,
                          placeholder: 'Search Places...',
                          debounce: '100',
                        }}
                      />
                  </div>
                </div>

                <div className="field">
                  <style>
                    {
                      `.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
                        padding-left: 0;
                        padding-right: 0;
                        width: 80px;
                      }
                      .react-datepicker-wrapper {
                        width: 100%
                      }
                      .react-datepicker__input-container {
                        width: 100%
                      }`
                    }
                  </style>
                  <DatePicker
                    className="ui fluid input"
                    selected={this.state.dateTime}
                    onChange={this.handleDateChange}
                    placeholderText="Click for Date and Time"
                    showTimeSelect
                    showMonthDropdown
                    dateFormat="LLL"
                  />
                </div>

                <div className="field">
                  <div className="ui left input">
                    <label htmlFor="needed" />
                    <input
                      value={this.state.needed}
                      onChange={e => {this.handleNeeded(e)}}
                      type="text"
                      id="volunteers"
                      name="volunteers"
                      placeholder="# of Volunteers Needed"
                      />
                  </div>
                </div>

                <button
                  onClick={() => {this.handleCreate()}}
                  className="ui fluid large blue submit button">
                  Create
                </button>
              </div>
            </div>

            <div className="ui message">
              <Link className="ui fluid large blue submit button" to="/">
                Back to the main page!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Create;
