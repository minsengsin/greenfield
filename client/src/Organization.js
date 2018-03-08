import React from 'react';
import TaskList from './TaskList.js';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './Header.js'

class Organization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: '',
      bio: '',
      contact: '',
      location: '',
      site: '',
      username: this.props.location.username,
    };
    console.log(this.props.match.params.orgname);
  }

  componentWillMount() {
    console.log(this.props.match.params.orgname);
    axios.get(`/orgs/tasks/${this.props.match.params.orgname}`).then(data => {
      console.log('--------', data);
      this.setState({
        tasks: data.data,
      });
    });
    axios.get(`/orgs/${this.props.match.params.orgname}`).then(data => {
      console.log('--------', data);
      const { name, bio, contact, location, site } = data.data;
      this.setState({
        name,
        bio,
        contact,
        location,
        site,
      });
    });
  }
////
  render() {
    var cTaskList = this.state.tasks.slice();
    cTaskList = cTaskList.filter(t=>t.completed ===true);
    var taskList = this.state.tasks.slice();
    taskList = taskList.filter(f=>f.completed === false);
    console.log('this is tasklist inside org.js', taskList)
    return (
      <div>
        <Header name={this.state.username}/>
        <div className="ui container" style={{paddingTop: '100px'}}>
          <div className="ui three column center aligned stackable grid">
            <div className="row">
              <div className="twelve wide column">
                <div className="ui segment">
                  <h2 className="ui header">
                    {this.state.name}
                    <a href={`http://${this.state.site}`}><h5 className="ui center aligned header grey">{this.state.site}</h5></a>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="six wide column" style={{maxWidth: '350px'}}>
                <div className="ui message">
                  <h1 className="ui center aligned header grey">Description</h1>
                </div>
                <div className="ui left aligned segment">
                  <b>Organization Bio: </b>
                  <p>{this.state.bio}</p>
                </div>
                <div className="ui left aligned segment">
                  <b>Contact Info: </b> <br /><br />
                  <p>Website: {this.state.site}</p>
                  <p>Phone: {this.state.contact}</p>
                  <p>Location: {this.state.location}</p>
                </div>
              </div>
              <div className="six wide column" style={{maxWidth: '350px'}}>
                <div className="ui message">
                  <h1 className="ui center aligned header grey">Task List</h1>
                </div>
                <TaskList tasks={taskList} username={this.state.username} />
              </div>
              <div className="six wide column" style={{maxWidth: '350px'}}>
                <div className="ui message">
                  <h1 className="ui center aligned header grey">Completed List</h1>
                </div>
                <TaskList tasks={cTaskList} username={this.state.username} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Organization;
