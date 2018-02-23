import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Signup from './Signup.js';
import './signup.css';
import axios from 'axios';

class Create extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      time: '',
      organization: '',
      date: '',
      location: '',
      title: '',
      description: ''
    };
    this.handleTime = this.handleTime.bind(this)
    this.handleOrg = this.handleOrg.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleDesc = this.handleDesc.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleLoc = this.handleLoc.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }
handleCreate() {
  axios.post('/tasks', {
    time: this.state.time,
    organization: this.state.organization,
    date: this.state.date,
    location: this.state.location,
    title: this.state.title,
    description: this.state.description
  }).then(()=>{this.props.history.push('/')})
}
handleTime(e) {
  this.setState({
    time: e.target.value
  })
}
handleOrg(e) {
  this.setState({
    organization: e.target.value
  })
} 
handleDate(e) {
  this.setState({
    date: e.target.value
  })
}
handleDesc(e) {
  this.setState({
    description: e.target.value
  })
}
handleTitle(e) {
  this.setState({
    title: e.target.value
  })
}
handleLoc (e) {
  this.setState({
    location: e.target.value
  })
}

  render() {
    return (
      <div className="ui container" style={{paddingTop: '100px'}}>
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{maxWidth: '450px'}}>

        
            <h2 className="ui blue image header">
              <div className="content">Create new task</div>
            </h2>
      
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <label htmlFor="organization" />
                    <input value={this.state.organization} onChange={(e) => {this.handleOrg(e)}}
                      type="text"
                      id="organization"
                      type="text"
                      name="organization"
                      placeholder="Organization Name"
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="ui left icon input">
                    <label htmlFor="title" />
                    <input value={this.state.title} onChange={(e) => {this.handleTitle(e)}}
                      type="text"
                      id="title"
                      type="text"
                      name="title"
                      placeholder="What kind of task?"
                    />
                  </div>
                </div>
                
                <div className="field">
                  <div className="ui left icon input">
                    <label htmlFor="description" />
                    <input value={this.state.description} onChange={(e) => {this.handleDesc(e)}}
                      type="text"
                      id="description"
                      type="text"
                      name="description"
                      placeholder="Describe your task"
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="ui left icon input">
                    <label htmlFor="location" />
                    <input value={this.state.location} onChange={(e) => {this.handleLoc(e)}}
                      type="text"
                      id="location"
                      type="text"
                      name="location"
                      placeholder="Location"
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="ui left icon input">
                    <label htmlFor="date" />
                    <input value={this.state.date} onChange={(e) => {this.handleDate(e)}}
                      type="text"
                      id="date"
                      type="text"
                      name="date"
                      placeholder="Date? (YYYY-MM-DD)"
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="ui left icon input">
                    <label htmlFor="time" />
                    <input value={this.state.time} onChange={(e) => {this.handleTime(e)}}
                      type="text"
                      id="time"
                      type="text"
                      name="time"
                      placeholder="Event Time?"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {this.handleCreate()}}
                  className="ui fluid large blue submit button"
                >Create</button>
              </div>
              
       
          <div className="ui message">
              <Link className="ui fluid large blue submit button" to="/">
                Back to the main page!
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Create;