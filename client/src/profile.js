import React from 'react';
import TaskDetails from './TaskDetails.js'
import Traits from './Traits.js';
import Header from './Header.js';
import GoogleMaps from './Map.js';
import ListTask from './ListTask.js';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
   	}
  }

  componentWillMount() {
    console.log(this.props.match.params.username)
    axios.get(`/users/${this.props.match.params.username}`).then((data) => { //data is array of TasksID of that user [1,2,3]
        function getTasks(el) {
          return axios.get(`/tasks/${el}`)
        };
      Promise.all(data.data.map(getTasks)).then((arrayOfTasks) => { //Promise.all([axios.get('user/1'), axios.get('user/2')])
        var Tasks = []
        arrayOfTasks.map((task)=> {
          Tasks.push(task.data);
        })
        this.setState({
          tasks: Tasks
        })
      })
    })
  }

render(){ return (
this.state.tasks.length > 0 ? 
       
      <div>
        <ListTask TaskList={this.state.tasks} />
      </div>
     :   <div> Loading ... </div>
)
  }




}


export default Profile;