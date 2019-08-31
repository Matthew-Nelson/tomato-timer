import React, { Component } from 'react';
import Header from './Header.js';
import Clock from './Clock.js';
import TomatoCounter from './TomatoCounter.js';

import './styles/css/main.css';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      tomatoes: 2,
      timeElements: [
        {
          isTomato: true,
          minutes: 25
        },
        {
          isTomato: false,
          minutes: 5
        }
      ]
    }
  }

  finishTimer = (countAsTomato, secondsCompleted) => {

    var newTimeElement = {
      isTomato: countAsTomato,
      minutes: (secondsCompleted / 60)
    }

    console.log(newTimeElement);

    this.setState({
      tomatoes: this.state.tomatoes + 1,
      timeElements: [...this.state.timeElements, newTimeElement]
    })
  }

  render() {

    return (

      <div className="App">
        <header className="App-header">
          <Header />
          <Clock finishTimer={this.finishTimer} />
          <hr/>
          <TomatoCounter tomatoCount={this.state.tomatoes} timeElements={this.state.timeElements} />
        </header>
      </div>
    )
  }
}
