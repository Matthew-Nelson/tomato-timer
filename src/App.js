import React, { Component } from 'react';
import Header from './Header.js';
import Clock from './Clock.js';
import TomatoCounter from './TomatoCounter.js';
import uuid from 'uuid';
import mp3_file from './assets/ship-bell.mp3';
import { withCookies } from 'react-cookie';

import './styles/css/main.css';


class App extends Component {

  constructor(props){
    super(props);
    const { cookies } = props;

    this.state = {
      timeElements: cookies.get('timeElements') || []
    }
  }

  finishTimer = (countAsTomato, secondsCompleted) => {

    var newTimeElement = {
      isTomato: countAsTomato,
      minutes: (secondsCompleted / 60),
      id: uuid()
    }

    this.setState({
      timeElements: [...this.state.timeElements, newTimeElement]
    })

    var audio = document.getElementById("alarm-audio");
    audio.play();


    this.setElementsCookie();

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
  
  setElementsCookie = () => {
    const { cookies } = this.props;
    var currentDate = new Date();
    var year = currentDate.getFullYear()
    var month = currentDate.getMonth()
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var expDate = new Date(year, month + 1, day, hours, minutes)
    cookies.set('timeElements', this.state.timeElements, { path: '/', expires: expDate});
  }

  clearElementsCookie = () => {
    this.setState({
      timeElements: []
    }, () => {
      this.setElementsCookie();
    })
  }

  render() {
    const name = this.state.name;

    return (

      <div className="App">
        <header className="App-header">
          <div>{name}</div>
          <Header />
          <Clock finishTimer={this.finishTimer} />
          <hr/>
          <TomatoCounter timeElements={this.state.timeElements} deleteElement={this.deleteElement} clearElementsCookie={this.clearElementsCookie}/>

          <audio id="alarm-audio" src={mp3_file} type="audio/mpeg"/>

        </header>
      </div>
    )
  }
}

export default withCookies(App);