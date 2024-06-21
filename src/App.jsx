import React, { useState, useEffect } from 'react';
import Header from './Header';
import Clock from './Clock';
import TomatoCounter from './TomatoCounter';
import Footer from './Footer';
import Container from '@material-ui/core/Container';
import { v4 as uuidv4 } from 'uuid';
import { analogWatch, schoolBell, shipBell, templeBell } from './assets/alarm-sounds';
import { withCookies } from 'react-cookie';
import './styles/css/main.css';

const App = (props) => {
  const { cookies } = props;

  const alarmSounds = [
    { name: 'School Bell', url: schoolBell, id: uuidv4() },
    { name: 'Ship Bell', url: shipBell, id: uuidv4() },
    { name: 'Temple Bell', url: templeBell, id: uuidv4() },
    { name: 'Analog Watch', url: analogWatch, id: uuidv4() },
  ];

  const defaultSettings = {
    pomodoroTimeLengthMinutes: 25,
    longBreakTimeLengthMinutes: 10,
    shortBreakTimeLengthMinutes: 5,
    alarmSoundUrl: '/tomato-tracker/static/media/ship-bell.be4257c1.mp3',
    alarmVolumePercent: 100,
    showBreaksInLog: false,
    showSkipButton: true,
  };

  const defaultClock = {
    startSeconds: defaultSettings.pomodoroTimeLengthMinutes * 60,
    timerType: 'pomodoro',
  };

  const [settings, setSettings] = useState(cookies.get('settings') || { ...defaultSettings });
  const [clock, setClock] = useState(cookies.get('currentClockState') || { ...defaultClock });
  const [daysWithWork, setDaysWithWork] = useState(cookies.get('daysWithWork') || []);
  const [supportsAudio, setSupportsAudio] = useState(true);

  useEffect(() => {
    setClock({
      startSeconds: settings.pomodoroTimeLengthMinutes * 60,
      timerType: 'pomodoro',
    });
  }, []);

  const setDaysCookie = () => {
    cookies.set('daysWithWork', daysWithWork, { path: '/tomato-tracker/', expires: getExpDate() });
  };

  const getExpDate = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes());
  };

  const createNewDayWithElement = (newDate, newTimeElement) => {
    const newDayWithWork = {
      date: newDate,
      id: uuidv4(),
      timeElements: [newTimeElement],
    };
    setDaysWithWork([newDayWithWork, ...daysWithWork]);
    setDaysCookie();
  };

  const pushElementToExistingDay = (existingDateIndex, newTimeElement) => {
    const newDaysWithWork = [...daysWithWork];
    newDaysWithWork[existingDateIndex].timeElements.push(newTimeElement);
    setDaysWithWork(newDaysWithWork);
    setDaysCookie();
  };

  const createTimeElement = (timerType, secondsCompleted, timeStarted) => {
    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const amOrPm = hours >= 12 ? 'PM' : 'AM';
      if (hours > 12) hours -= 12;
      return `${hours}:${minutes} ${amOrPm}`;
    };

    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    const newTimeElement = {
      isTomato: timerType === 'pomodoro',
      minutes: secondsCompleted / 60,
      id: uuidv4(),
      comment: '',
      editingComment: true,
      timeStarted: formatTime(timeStarted),
      timeCompleted: formatTime(new Date()),
      dateCompleted: formatDate(new Date()),
    };

    if (daysWithWork.length === 0) {
      document.querySelector('.footer-container').scrollIntoView({ behavior: 'smooth' });
    }

    return newTimeElement;
  };

  const finishTimer = (timerType, secondsCompleted, startedWhen) => {
    const newTimeElement = createTimeElement(timerType, secondsCompleted, startedWhen);
    const dayToUpdate = daysWithWork.find((day) => day.date === newTimeElement.dateCompleted);

    if (dayToUpdate) {
      pushElementToExistingDay(daysWithWork.indexOf(dayToUpdate), newTimeElement);
    } else {
      createNewDayWithElement(newTimeElement.dateCompleted, newTimeElement);
    }

    const audio = document.querySelector('#alarm-audio');
    const promise = audio.play();
    if (promise !== undefined) {
      promise.then().catch(() => setSupportsAudio(false));
    }
  };

  const deleteElement = (dayId, elementId) => {
    const newDaysArray = daysWithWork.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          timeElements: day.timeElements.filter((element) => element.id !== elementId),
        };
      }
      return day;
    });
    setDaysWithWork(newDaysArray);
    setDaysCookie();
  };

  const updateSettings = (returnedSettings) => {
    let newClockStartSeconds;
    switch (clock.timerType) {
      case 'pomodoro':
        newClockStartSeconds = returnedSettings.pomodoroTimeLengthMinutes * 60;
        break;
      case 'short-break':
        newClockStartSeconds = returnedSettings.shortBreakTimeLengthMinutes * 60;
        break;
      case 'long-break':
        newClockStartSeconds = returnedSettings.longBreakTimeLengthMinutes * 60;
        break;
      default:
        break;
    }

    setSettings(returnedSettings);
    setClock({
      startSeconds: newClockStartSeconds,
      timerType: clock.timerType,
    });
    setSettingsCookie(returnedSettings);
    setCurrentClockCookie({ startSeconds: newClockStartSeconds, timerType: clock.timerType });
    setAudioVolume(returnedSettings.alarmVolumePercent);
  };

  const setAudioVolume = (volumePercent) => {
    const audio = document.getElementById('alarm-audio');
    if (audio) {
      audio.volume = volumePercent / 100;
    }
  };

  const setCurrentClockCookie = (newClock) => {
    cookies.set('currentClockState', newClock, { path: '/tomato-tracker/', expires: getExpDate() });
  };

  const setSettingsCookie = (newSettings) => {
    cookies.set('settings', newSettings, { path: '/tomato-tracker/', expires: getExpDate() });
  };

  const clearSettingsCookie = () => {
    setSettings(defaultSettings);
    setSettingsCookie(defaultSettings);
  };

  const restoreCurrentClockCookie = () => {
    setClock(defaultClock);
    setCurrentClockCookie(defaultClock);
  };

  const changeClockFromVars = (newLength, timerType) => {
    setClock({
      startSeconds: newLength,
      timerType: timerType,
    });
    setCurrentClockCookie({ startSeconds: newLength, timerType });
  };

  const editLogComment = (dayId, elementId, comment) => {
    const newDaysArray = daysWithWork.map((day) => {
      if (day.id === dayId) {
        const newTimeElements = day.timeElements.map((element) => {
          if (element.id === elementId) {
            return { ...element, comment, editingComment: false };
          }
          return element;
        });
        return { ...day, timeElements: newTimeElements };
      }
      return day;
    });
    setDaysWithWork(newDaysArray);
    setDaysCookie();
  };

  const audioFailure = !supportsAudio && (
    <div>
      <p style={{ textAlign: 'center' }}>
        Audio failed on this device for some reason. Please navigate to the settings and save a new sound, adjust your
        volume, or simply press the 'test alarm' button. This will explicitly allow audio playback on your device.
      </p>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <Header
          alarmSounds={alarmSounds}
          defaultSettings={defaultSettings}
          settings={settings}
          updateSettings={updateSettings}
          clearSettingsCookie={clearSettingsCookie}
          restoreCurrentClockCookie={restoreCurrentClockCookie}
          clearDaysCookie={() => setDaysWithWork([])}
        />
        <div style={{ backgroundColor: '#d6d6d6' }}>
          <Container className="app-container" maxWidth="md">
            <Clock
              startSeconds={clock.startSeconds}
              timerType={clock.timerType}
              passVarsUp={changeClockFromVars}
              finishTimer={finishTimer}
              pomodoroTimeLengthSeconds={settings.pomodoroTimeLengthMinutes * 60}
              shortBreakTimeLengthSeconds={settings.shortBreakTimeLengthMinutes * 60}
              longBreakTimeLengthSeconds={settings.longBreakTimeLengthMinutes * 60}
              showSkipButton={settings.showSkipButton}
            />
            {audioFailure}
            <hr />
            <TomatoCounter
              daysWithWork={daysWithWork}
              deleteElement={deleteElement}
              editLogComment={editLogComment}
              showBreaksInLog={settings.showBreaksInLog}
            />
          </Container>
        </div>
        <Footer />
      </header>
      <audio id="alarm-audio" src={settings.alarmSoundUrl} type="audio/mpeg" />
    </div>
  );
};

export default withCookies(App);
