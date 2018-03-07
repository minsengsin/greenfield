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
      join: false,
    };
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
                      join: true,
                    })}
                    style={{
                      marginTop: '-10px',
                      marginBottom: '-10px',
                    }}
                    class="ui fluid button blue"
                  >
                    Join Organization
                  </button>
                  {this.state.join ?
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
