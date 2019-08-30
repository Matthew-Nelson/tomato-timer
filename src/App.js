import React, { Component } from 'react';
import Header from './Header.js';
import Clock from './Clock.js';
import TomatoCounter from './TomatoCounter.js';

import './styles/css/main.css';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      tomatoes: 0,
    }
  }

  incrementTomatoCounter = () => {
    this.setState({
      tomatoes: this.state.tomatoes + 1
    })
  }

  render() {

    return (

      <div className="App">
        <header className="App-header">
          <Header />
          <Clock incrementTomatoCounter={this.incrementTomatoCounter} />
          <TomatoCounter tomatoes={this.state.tomatoes} />
        </header>
      </div>
    )
  }
}
