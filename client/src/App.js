import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import Login from './Login.js';
import Signup from './Signup.js';
import mainPage from './mainPage.js';
import OneTask from './oneTask.js';
import sampleText from './SampleText.js';
import TaskDetails from './TaskDetails.js'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/mainPage' component={mainPage} />
          <Route path='/tasks/:taskId' component={OneTask} />
        </div>
        <div className="App">
          <Header />
          <TaskDetails task={`
      When I first brought my cat home from the Humane Society she was a mangy, pitiful animal. She was so thin that you could count her vertebrae just by looking at her. Apparently she was declawed by her previous owners, then abandoned or lost. Since she couldnt hunt, she nearly starved. Not only that, but she had an abscess on one hip. The vets at the Humane Society had drained it, but it was still scabby and without fur. She had a terrible cold, too. She was sneezing and sniffling and her meow was just a hoarse squeak. And shed lost half her tail somewhere. Instead of tapering gracefully, it had a bony knob at the end.
      `} />
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </div>
      </div>
    );
  }
}


export default App;
