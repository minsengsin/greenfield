import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './Header.js';
import ListTask from './ListTask.js';
import OneTask from './oneTask.js';
import GoogleMaps from './Map.js';
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
	      <div style={{display: 'block'}}>
  		  <GoogleMaps isMarkerShown
  					googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  					loadingElement={<div style={{ height: `100%` }} />}
  					containerElement={<div style={{ height: `400px` }} />}
  					mapElement={<div style={{ height: `100%` }}/>}
  					tasks={this.state.TaskList}
  					/>
  		  </div>
    	</div>
    )
  }

}

export default mainPage;