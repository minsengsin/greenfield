import React from 'react';
import TaskDetails from './TaskDetails.js'
import Traits from './Traits.js';
import Header from './Header.js';
import GoogleMaps from './Map.js';
import axios from 'axios';

class OneTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	task: []
   	}
  }

  componentWillMount() {
  	axios.get(`/tasks/${this.props.match.params.taskId}`).then((data) => {

  		this.setState({
  			task: [data.data]
  		})
  	})
  }

render(){ return (
this.state.task.length > 0 ? 
       
      <div>

        <div>Title: {this.state.task[0].title}</div>
        <div>Date: {this.state.task[0].time}</div>
        <div>description of task: {this.state.task[0].description}</div>
        <div>Location: {this.state.task[0].location}</div>


        <div style={{display: 'block'}}>
          <GoogleMaps isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }}/>}
            tasks={this.state.task}
            />
          </div>
      </div>
     :   <div> Loading ... </div>
)
  }




}


export default OneTask;