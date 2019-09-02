import React, { Component } from 'react';
import Header from './Header.js';
import Clock from './Clock.js';
import TomatoCounter from './TomatoCounter.js';
import Settings from './Settings.js';
import uuid from 'uuid';
import mp3_file from './assets/ship-bell.mp3';
import { withCookies } from 'react-cookie';

import './styles/css/main.css';


class App extends Component {

  constructor(props){
    super(props);
    const { cookies } = props;

    this.defaultSettings = {
      pomodoroTimeLengthMinutes: 25,
      longBreakTimeLengthMinutes: 10,
      shortBreakTimeLengthMinutes: 5,

      alarmSound: 'ship-bell',
      alarmVolume: 1.0,

      browserNotification: true,

      autoStartSegments: false,

      logViewPomodorosOnly: false,
      logListView: true,
      logDescendingList: true
    }

    this.state = {
      timeElements: cookies.get('timeElements') || [],
      settings: cookies.get('settings') || {
        ...this.defaultSettings
      },
      clock: cookies.get('currentClockState') || {
        startSeconds: 1500,
        timerType: 'pomodoro'
      }
    }
  }

  finishTimer = (timerType, secondsCompleted) => {

    var newTimeElement = {
      isTomato: (timerType === 'pomodoro'),
      minutes: (secondsCompleted / 60),
      id: uuid()
    }

    this.setState({
      timeElements: [...this.state.timeElements, newTimeElement]
    }, () => {
      this.setElementsCookie();
    })

    var audio = document.getElementById("alarm-audio");
    audio.play();

  }

  deleteElement = (id) => {

    var newArray = this.state.timeElements.filter((element) => {
      return element.id !== id;
    })

    this.setState({
      timeElements: newArray
    }, () => {
      this.setElementsCookie();
    })  
  }

  getExpDate = () => {
    var currentDate = new Date();
    var year = currentDate.getFullYear()
    var month = currentDate.getMonth()
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var expDate = new Date(year, month + 1, day, hours, minutes)
    return expDate;
  }

  setElementsCookie = () => {
    const { cookies } = this.props;
    cookies.set('timeElements', this.state.timeElements, { path: '/', expires: this.getExpDate()});
  }

  clearElementsCookie = () => {
    this.setState({
      timeElements: []
    }, () => {
      this.setElementsCookie();
    })
  }

  updateSettings = (returnedSettings) => {

    var newClockStartSeconds;
    if (this.state.clock.timerType === 'pomodoro') {
      newClockStartSeconds = returnedSettings.pomodoroTimeLengthMinutes*60;
    } else if (this.state.clock.timerType === 'short-break') {
      newClockStartSeconds = returnedSettings.shortBreakTimeLengthMinutes*60;
    } else if (this.state.clock.timerType === 'long-break') {
      newClockStartSeconds = returnedSettings.longBreakTimeLengthMinutes*60;
    }

    this.setState({
      settings: {
        ...returnedSettings
      },
      clock: {
        startSeconds: newClockStartSeconds,
        timerType: this.state.clock.timerType
      }
    }, () => {
      this.setSettingsCookie();
      this.setCurrentClockCookie();
    })
  }

  setCurrentClockCookie = () => {
    const { cookies } = this.props;
    cookies.set('currentClockState', this.state.clock, { path: '/', expires: this.getExpDate()})
  }

  setSettingsCookie = () => {
    const { cookies } = this.props;
    cookies.set('settings', this.state.settings, { path: '/', expires: this.getExpDate()});
  }

  clearSettingsCookie = () => {
    this.setState({
      settings: {
        ...this.defaultSettings
      }
    }, () => {
      this.setSettingsCookie();
    })
  }

  changeClockFromVars = (newLength, timerType) => {
    this.setState({
      clock: {
        startSeconds: newLength,
        timerType: timerType
      }
    }, () => {
      this.setCurrentClockCookie();
    })
  }

  render() {

    return (

      <div className="App">
        <header className="App-header">
          <Header />
          <Clock startSeconds={this.state.clock.startSeconds} timerType={this.state.clock.timerType} passVarsUp={this.changeClockFromVars} finishTimer={this.finishTimer} pomodoroTimeLengthSeconds={this.state.settings.pomodoroTimeLengthMinutes*60} shortBreakTimeLengthSeconds={this.state.settings.shortBreakTimeLengthMinutes*60} longBreakTimeLengthSeconds={this.state.settings.longBreakTimeLengthMinutes*60}/>
          <hr/>
          <TomatoCounter timeElements={this.state.timeElements} deleteElement={this.deleteElement} clearElementsCookie={this.clearElementsCookie}/>
          <hr/>
          <Settings defaultSettings={this.defaultSettings} settings={this.state.settings} updateSettings={this.updateSettings} clearSettingsCookie={this.clearSettingsCookie}/>
          <audio id="alarm-audio" src={mp3_file} type="audio/mpeg"/>
        </header>
      </div>
    )
  }
}

export default withCookies(App);