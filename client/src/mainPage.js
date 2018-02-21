import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './Header.js';
import ListTask from './ListTask.js';
import OneTask from './oneTask.js';
import axios from 'axios';
class mainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TaskList: []
    }
  }

  componentDidMount() {
  	axios.get('/tasks').then((data) => {
  		console.log(data.data)
  		this.setState({
  			TaskList: data.data
  		})
  	})
  }

  render() {
    return (
    	<div>
    	<Header />
	      <ListTask TaskList={this.state.TaskList} />
    	</div>
    )
  }

}

export default mainPage;