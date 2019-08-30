import React, { Component } from 'react';
import Header from './Header.js';
import ClockChanger from './ClockChanger.js';
import Clock from './Clock.js';
import TomatoCounter from './TomatoCounter.js';

import './styles/css/main.css';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      tomatoes: 0,
      clockLength: "pomodoro",
      isRunning: false
    }
  }


  changeClock = (newLength) => {
    this.setState({ clockLength: newLength });
    this.updateClockState(false);
  }

  updateClockState = (clockState) => {
    this.setState({
      isRunning: clockState
    })
  }

  render() {

    const SECONDSIN25MINS = 10;
    const SECONDSIN10MINS = 6;
    const SECONDSIN5MINS = 3;

    var startSeconds = 0;
    if (this.state.clockLength === "pomodoro") {
      startSeconds = SECONDSIN25MINS;
    } else if (this.state.clockLength === "long") {
      startSeconds = SECONDSIN10MINS;
    } else if (this.state.clockLength === "short") {
      startSeconds = SECONDSIN5MINS;
    }

    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <ClockChanger changeClock={this.changeClock} />
          <Clock clockLength={this.state.clockLength} startSeconds={startSeconds} updateClockState={this.updateClockState} stopRunning={this.state.isRunning}/>
          <TomatoCounter tomatoes={this.state.tomatoes} />
        </header>
    </div>
    )
  }
}
