import React, { Component } from 'react';
import Header from './Header.js';
import Clock from './Clock.js';
import TomatoCounter from './TomatoCounter.js';
import uuid from 'uuid';
import mp3_file from './assets/ship-bell.mp3'

import './styles/css/main.css';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      timeElements: [
        {
          isTomato: true,
          minutes: 25,
          id: uuid()
        },
        {
          isTomato: false,
          minutes: 5,
          id: uuid()
        }
      ]
    }
  }

  finishTimer = (countAsTomato, secondsCompleted) => {

    var newTimeElement = {
      isTomato: countAsTomato,
      minutes: (secondsCompleted / 60),
      id: uuid()
    }

    this.setState({
      tomatoes: this.state.tomatoes + 1,
      timeElements: [...this.state.timeElements, newTimeElement]
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
    })
    
  }

  render() {

    return (

      <div className="App">
        <header className="App-header">
          <Header />
          <Clock finishTimer={this.finishTimer} />
          <hr/>
          <TomatoCounter timeElements={this.state.timeElements} deleteElement={this.deleteElement}/>

          <audio id="alarm-audio" src={mp3_file} type="audio/mpeg"/>

        </header>
      </div>
    )
  }
}
