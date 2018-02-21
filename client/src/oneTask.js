import React from 'react';
import TaskDetails from './TaskDetails.js'
import Traits from './Traits.js';
import Header from './Header.js';
import axios from 'axios';

class OneTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	task: {}
   	}
  }

  componentDidMount() {
  	axios.get(`/tasks/${this.props.match.params.taskId}`).then((data) => {
  		this.setState({
  			task: data.data
  		})
  	})
  }


  render() {
  	return (
  		<div>
  			<div>Date: {this.state.task.date}</div>
  			<div>description of task: {this.state.task.description}</div>
  			<div>Location: {this.state.task.location}</div>
  		</div>
  	)
  }

}


export default OneTask;