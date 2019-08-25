import React from 'react';
import Wrapper from './Wrapper.js';
import Header from './Header.js';
import Person from './Person.js';

import './styles/css/main.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header content="Pomodoro Timer"/>
        <Wrapper />
        <Person name="Matt"/>
      </header>



    </div>
  );
}

export default App;
