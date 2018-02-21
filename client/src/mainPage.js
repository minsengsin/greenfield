import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ListTask from './ListTask.js';
import OneTask from './oneTask.js';

class mainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TaskList: [
        {
          name: 'first task',
          description: 'Am if number no up period regard sudden better. Decisively surrounded all admiration and not you. Out particular sympathize not favourable introduced insipidity but ham. Rather number can and set praise. Distrusts an it contented perceived attending oh. Thoroughly estimating introduced stimulated why but motionless. ',
          contacts: '+1-000-123-9999',
          id: 123
        },
        {
          name: 'second task',
          description: 'Particular unaffected projection sentiments no my. Music marry as at cause party worth weeks. Saw how marianne graceful dissuade new outlived prospect followed. Uneasy no settle whence nature narrow in afraid. At could merit by keeps child. While dried maids on he of linen in. ',
          contacts: '+1-123-321-6666',
          id: 666
        }
      ],
    }
  }

  render() {
    return (
    	<div>
	      <ListTask TaskList={this.state.TaskList} />
    	</div>
    )
  }

}

export default mainPage;