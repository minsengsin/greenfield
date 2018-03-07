import React from 'react';
import TaskList from './TaskList.js';
import axios from 'axios';
import Header from './Header.js';
import OrgListItem from './OrgListItem.js'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      orgs: [],
      notOrgs: [],
      join: false,
      organization: '',
      orgUsername: '',
      password: '',
    };
    this.handleOrg = this.handleOrg.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  componentWillMount() {
    console.log(this.props.match.params.username);
    axios.get(`/users/${this.props.match.params.username}`).then(data => {
      console.log('--------', data);
      function getTasks(el) {
        return axios.get(`/tasks/${el}`);
      }
      Promise.all(data.data.map(getTasks)).then(arrayOfTasks => {
        console.log('array of tasks: ', arrayOfTasks);
        var Tasks = [];
        arrayOfTasks.map(task => Tasks.push(task.data));
        console.log('----TASKS---- ', Tasks);
        this.setState({
          tasks: Tasks,
        });
      });
    });

    axios.get(`/orgs/user/${this.props.match.params.username}`).then(results => {
      console.log(results)
      const orgs = results.data;
      this.setState({
        orgs,
      }, () => {
        axios.get(`/orgs/user/${this.props.match.params.username}/not`).then(results => {
          console.log(results)
          let notOrgs = results.data;
          console.log(notOrgs);
          notOrgs = notOrgs.filter(o => !this.state.orgs.map(m => m.name).includes(o.name));
          console.log(notOrgs);
          this.setState({
            notOrgs,
          });
        });
      });
    });
  }

  handleOrg(e) {
    if(e.target.selectedIndex > 1){
      this.setState({
        organization: e.target.options[e.target.selectedIndex].text,
      });
    } else if (e.target.selectedIndex === 1) {
      this.props.history.push(`/createOrg/${this.props.match.params.username}`);
    }
  }

  handleUsername(e) {
    this.setState({
      orgUsername: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleJoin() {
    console.log('join');
    axios.post('/orgs/join', {
      username: this.props.match.params.username,
      name: this.state.organization,
      orgUsername: this.state.orgUsername,
      password: this.state.password,
    }).then(result => {
      console.log(result);
      this.componentWillMount();
      this.setState({
        join: false,
      });
    });
  }

  render() {
    return (
      <div>
        <Header name={this.props.match.params.username}/>
        <div className="ui container" style={{paddingTop: '100px'}}>
          <div className="ui two column center aligned stackable grid">
            <div className="row">
              <div className="twelve wide column">
                <div className="ui segment">
                  <h2 className="ui header">
                    {this.props.match.params.username}
                    <a href={`http://${this.state.site}`}><h5 className="ui center aligned header grey">{this.state.site}</h5></a>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="six wide column" style={{maxWidth: '350px'}}>
                <div>
                  <div className="ui message">
                    <h1 className="ui center aligned header grey">My Organizations</h1>
                  </div>
                  <button
                    onClick={() => this.setState({
                      join: !this.state.join,
                    })}
                    style={{
                      marginTop: '-10px',
                      marginBottom: '-10px',
                    }}
                    className="ui fluid button blue"
                  >
                    Join Organization
                  </button>
                  {this.state.join ?
                    <div
                      style={{
                        marginTop: '15px',
                      }}
                      className="ui large form"
                    >
                      <div className="field">
                        <select
                          className="ui search dropdown"
                          onChange={e => {this.handleOrg(e)}}
                          >
                          <option>Organization</option>
                          <option>Create New Organization</option>
                          {this.state.notOrgs.map(m => <option>{m.name}</option>)}
                        </select>
                      </div>

                      <div className="field">
                        <div className="ui left input">
                          <label htmlFor="password" />
                          <input
                            value={this.state.orgUsername}
                            onChange={e => {
                              this.handleUsername(e);
                            }}
                            type="text"
                            id="orgUsername"
                            name="orgUsername"
                            placeholder="Username"
                            />
                        </div>
                      </div>

                      <div className="field">
                        <div className="ui left input">
                          <label htmlFor="password" />
                          <input
                            value={this.state.password}
                            onChange={e => {
                              this.handlePassword(e);
                            }}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            />
                        </div>
                      </div>
  
                      <button
                        onClick={() => {
                          this.handleJoin();
                        }}
                        className="ui fluid large blue submit button">
                        Join
                      </button>
                    </div> :
                    ''
                  }
                  <TaskList item={OrgListItem} tasks={this.state.orgs} username={this.props.match.params.username} />
                </div>
              </div>
              <div className="six wide column" style={{maxWidth: '350px'}}>
                <div>
                  <div className="ui message">
                    <h1 className="ui center aligned header grey">Accepted Tasks</h1>
                  </div>
                  <TaskList tasks={this.state.tasks} username={this.props.match.params.username} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>













      // <div className="ui container" style={{paddingTop: '25px'}}>
      //   <div className="ui middle aligned center aligned grid">
      //     <div className="column" style={{maxWidth: '350px'}}>
      //       {this.state.tasks.length > 0 ? (
      //         <div>
      //           <Header className="ui header" name={this.props.match.params.username}/>
      //           <div style={{paddingTop: '50px'}}>
      //             <TaskList tasks={this.state.tasks} username={this.props.match.params.username} />
      //           </div>
      //         </div>
      //       ) : (
      //         <div>
      //           <Header className="ui header" name={this.props.match.params.username}/>
      //           <div style={{paddingTop: '50px'}}>
      //             <h2>No Tasks to Display!</h2>
      //           </div>
      //         </div>
      //       )}
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Profile;
