import React, { Component } from 'react';
import Header from './Header.js';
import Clock from './Clock.js';
import TomatoCounter from './TomatoCounter.js';
import Container from '@material-ui/core/Container';
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
      longBreakTimeLengthMinutes: 15,
      shortBreakTimeLengthMinutes: 5,

      alarmSoundUrl: '/static/media/ship-bell.be4257c1.mp3',
      alarmVolumePercent: 100,

      showBreaksInLog: false,
      showSkipButton: false
    }

    this.defaultClock = {
      startSeconds: (this.defaultSettings.pomodoroTimeLengthMinutes * 60),
      timerType: 'pomodoro'
    }

    this.state = {
      settings: cookies.get('settings') || {
        ...this.defaultSettings
      },
      clock: cookies.get('currentClockState') || {
        ...this.defaultClock
      },
      daysWithWork: cookies.get('daysWithWork') || []
    }
  }

  createNewDayWithElement = (newDate, newTimeElement) => {
    var newDayWithWork = {
      date: newDate,
      id: uuid(),
      timeElements: [
        newTimeElement
      ]
    }
    this.setState({
      daysWithWork: [newDayWithWork, ...this.state.daysWithWork]
    }, () => {
      this.setDaysCookie();
    })
  }

  pushElementToExistingDay = (existingDateIndex, newTimeElement) => {
    var newDaysWithWork = [...this.state.daysWithWork];
    newDaysWithWork[existingDateIndex].timeElements.push(newTimeElement);
    this.setState({
      daysWithWork: [...newDaysWithWork]
    }, () => {
      this.setDaysCookie();
    })
  }

  setDaysCookie = () => {
    const { cookies } = this.props;
    cookies.set('daysWithWork', this.state.daysWithWork, { path: '/', expires: this.getExpDate()});
  }

  clearDaysCookie = () => {
    this.setState({
      daysWithWork: []
    }, () => {
      this.setDaysCookie();
    })
  }

  createTimeElement = (timerType, secondsCompleted, timeStarted) => {
    // formatting time started
    var minutesStrt = timeStarted.getMinutes();
    if (minutesStrt.toString().length === 1) {
      minutesStrt = `0${minutesStrt}`;
    }
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
    if (minutesFin.toString().length === 1) {
      minutesFin = `0${minutesFin}`;
    }
    var hoursFin = dateFin.getHours();
    var monthFin = dateFin.getMonth() + 1;
    var dayFin = dateFin.getDate();
    var yearFin = dateFin.getFullYear();

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
      comment: "",
      editingComment: true,
      timeStarted: formattedTimeStarted,
      timeCompleted: formattedTimeCompleted,
      dateCompleted: formattedDateCompleted
    }
    return newTimeElement;
  }

  finishTimer = (timerType, secondsCompleted, startedWhen) => {

    var newTimeElement = this.createTimeElement(timerType, secondsCompleted, startedWhen);

    var dayToUpdate = {};
    if (this.state.daysWithWork.some( (day) => {
      dayToUpdate = day;
      return day.date === newTimeElement.dateCompleted;
    })) {
      this.pushElementToExistingDay(this.state.daysWithWork.indexOf(dayToUpdate), newTimeElement);
    } else {
      this.createNewDayWithElement(newTimeElement.dateCompleted, newTimeElement);
    }
    
    var audio = document.getElementById("alarm-audio");
    if (audio) {
      audio.play();
      console.log(audio);
    } else {
      console.log('audio not loaded?');
      console.log(audio);
    }
    

  }

  deleteElement = (dayId, elementId) => {

    var newDaysArray = this.state.daysWithWork;
    newDaysArray.forEach( (day) => {
      if (day.id === dayId) {
        var newElementsArray = day.timeElements.filter( (element) => {
          return element.id !== elementId;
        })
        day.timeElements = newElementsArray;
      }
    });

    this.setState({
      daysWithWork: [...newDaysArray]
    }, () => {
      this.setDaysCookie();
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
      this.setAudioVolume();
    })
  }

  setAudioVolume = () => {
    var audio = document.getElementById("alarm-audio");
    audio.volume = this.state.settings.alarmVolumePercent/100;
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

  editLogComment = (dayId, elementId, comment) => {

    var newDaysArray = this.state.daysWithWork;
    newDaysArray.forEach( (day) => {
      if (day.id === dayId) {
        day.timeElements.forEach( (element) => {
          if (element.id === elementId) {
            element.comment = comment;
            element.editingComment = false;
          }
        })
      }
    });

    this.setState({
      daysWithWork: [...newDaysArray]
    }, () => {
      this.setDaysCookie();
    })  

  }

  componentDidMount = () => {

    this.setState({
      clock: {
        startSeconds: this.state.settings.pomodoroTimeLengthMinutes*60,
        timerType: 'pomodoro'
      }
    }, () => {
      this.setCurrentClockCookie();
      this.setAudioVolume();
    })

  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <Container className="app-container" maxWidth="md">
            <Header alarmSounds={this.alarmSounds} defaultSettings={this.defaultSettings} settings={this.state.settings} updateSettings={this.updateSettings} clearSettingsCookie={this.clearSettingsCookie} restoreCurrentClockCookie={this.restoreCurrentClockCookie} clearDaysCookie={this.clearDaysCookie}/>
            <hr/>
            <Clock startSeconds={this.state.clock.startSeconds} timerType={this.state.clock.timerType} passVarsUp={this.changeClockFromVars} finishTimer={this.finishTimer} pomodoroTimeLengthSeconds={this.state.settings.pomodoroTimeLengthMinutes*60} shortBreakTimeLengthSeconds={this.state.settings.shortBreakTimeLengthMinutes*60} longBreakTimeLengthSeconds={this.state.settings.longBreakTimeLengthMinutes*60} showSkipButton={this.state.settings.showSkipButton}/>
            <hr/>
            <TomatoCounter daysWithWork={this.state.daysWithWork} deleteElement={this.deleteElement} editLogComment={this.editLogComment} showBreaksInLog={this.state.settings.showBreaksInLog}/>
          </Container>
        </header>
        <audio id="alarm-audio" src={this.state.settings.alarmSoundUrl} type="audio/mpeg" />
      </div>
    )
  }
}

export default withCookies(App);