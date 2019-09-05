import React, { Component } from 'react';
import Header from './Header.js';
import Clock from './Clock.js';
import TomatoCounter from './TomatoCounter.js';
import Settings from './Settings.js';
import uuid from 'uuid';
import { analogWatch, schoolBell, shipBell, templeBell } from './assets/alarm-sounds.js';
import { withCookies } from 'react-cookie';

import './styles/css/main.css';


class App extends Component {

  constructor(props){
    super(props);
    const { cookies } = props;

    this.alarmSounds = [
      {
        name: 'School Bell',
        url: schoolBell,
        id: uuid()
      },
      {
        name: 'Ship Bell',
        url: shipBell,
        id: uuid()
      },
      {
        name: 'Temple Bell',
        url: templeBell,
        id: uuid()
      },
      {
        name: 'Analog Watch',
        url: analogWatch,
        id: uuid()
      }
    ]

    this.defaultSettings = {
      pomodoroTimeLengthMinutes: 25,
      longBreakTimeLengthMinutes: 10,
      shortBreakTimeLengthMinutes: 5,

      alarmSoundUrl: '/static/media/ship-bell.be4257c1.mp3',
      alarmVolumePercent: 25,

      browserNotification: true,

      autoStartSegments: false,

      logViewPomodorosOnly: false,
      logListView: true,
      logDescendingList: true
    }

    this.defaultClock = {
      startSeconds: 1500,
      timerType: 'pomodoro'
    }

    this.state = {
      timeElements: cookies.get('timeElements') || [
        // no default time Elements. The user hasnt completed any yet.
      ],
      settings: cookies.get('settings') || {
        ...this.defaultSettings
      },
      clock: cookies.get('currentClockState') || {
        ...this.defaultClock
      }
    }
  }

  createTimeElement = (timerType, secondsCompleted, timeStarted) => {
    // formatting time started
    var minutesStrt = timeStarted.getMinutes();
    var hoursStrt = timeStarted.getHours();

    var amOrPmStrt = "";
    if (hoursStrt > 12) {
      hoursStrt = hoursStrt-12;
      amOrPmStrt = "PM";
    } else if (hoursStrt < 12) {
      amOrPmStrt = "AM";
    } else if (hoursStrt === 12 ) {
      amOrPmStrt = "PM";
    }

    var formattedTimeStarted = `${hoursStrt}:${minutesStrt} ${amOrPmStrt}`;

    // formatting time and date completed
    var dateFin = new Date();
    var minutesFin = dateFin.getMinutes();
    var hoursFin = dateFin.getHours();
    var monthFin = dateFin.getUTCMonth() + 1;
    var dayFin = dateFin.getUTCDate();
    var yearFin = dateFin.getUTCFullYear();

    var amOrPmFin = "";
    if (hoursFin > 12) {
      hoursFin = hoursFin-12;
      amOrPmFin = "PM";
    } else if (hoursFin < 12) {
      amOrPmFin = "AM";
    } else if (hoursFin === 12 ) {
      amOrPmFin = "PM";
    }

    var formattedDateCompleted = `${monthFin}/${dayFin}/${yearFin}`;
    var formattedTimeCompleted = `${hoursFin}:${minutesFin} ${amOrPmFin}`;


    var newTimeElement = {
      isTomato: (timerType === 'pomodoro'),
      minutes: (secondsCompleted / 60),
      id: uuid(),
      comment: "Dummy comments are here",
      editingComment: false,
      timeStarted: formattedTimeStarted,
      timeCompleted: formattedTimeCompleted,
      dateCompleted: formattedDateCompleted
    }
    return newTimeElement;
  }

  finishTimer = (timerType, secondsCompleted, startedWhen) => {

    var newTimeElement = this.createTimeElement(timerType, secondsCompleted, startedWhen);

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

  restoreCurrentClockCookie = () => {
    this.setState({
      clock: {
        ...this.defaultClock
      }
    }, () => {
      this.setCurrentClockCookie();
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

  editLogComment = (id) => {
    console.log(id);
  }

  componentDidMount = () => {

    this.setState({
      clock: {
        startSeconds: this.state.settings.pomodoroTimeLengthMinutes*60,
        timerType: 'pomodoro'
      }
    }, () => {
      this.setCurrentClockCookie();
    })

    var audio = document.getElementById("alarm-audio");
    audio.volume = this.state.settings.alarmVolumePercent/100;

  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <Clock startSeconds={this.state.clock.startSeconds} timerType={this.state.clock.timerType} passVarsUp={this.changeClockFromVars} finishTimer={this.finishTimer} pomodoroTimeLengthSeconds={this.state.settings.pomodoroTimeLengthMinutes*60} shortBreakTimeLengthSeconds={this.state.settings.shortBreakTimeLengthMinutes*60} longBreakTimeLengthSeconds={this.state.settings.longBreakTimeLengthMinutes*60}/>
          <hr/>
          <TomatoCounter timeElements={this.state.timeElements} deleteElement={this.deleteElement} clearElementsCookie={this.clearElementsCookie} editLogComment={this.editLogComment}/>
          <hr/>
          <Settings alarmSounds={this.alarmSounds} defaultSettings={this.defaultSettings} settings={this.state.settings} updateSettings={this.updateSettings} clearSettingsCookie={this.clearSettingsCookie} restoreCurrentClockCookie={this.restoreCurrentClockCookie}/>
          <audio id="alarm-audio" src={this.state.settings.alarmSoundUrl} type="audio/mpeg" />
        </header>
      </div>
    )
  }
}

export default withCookies(App);