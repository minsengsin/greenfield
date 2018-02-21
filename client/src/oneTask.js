import React from 'react';

class OneTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	task: {}
   	}
  }

  componentDidMount() {
  	// axios.get(`/tasks/${this.props.match.params.taskId}`).then((data) => {
  	// 	this.setState({
  	// 		task: data
  	// 	})
  	// })
  }


  render() {
  	return (
  		<div>
  			<h1>Artem</h1>
  			<h1>{this.state.id}</h1>
  			<h1>{this.state.name}</h1>
    		<h1>{this.props.match.params.taskId}</h1>
  		</div>
  	)
  }

}


export default OneTask;