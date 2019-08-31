import React, { Component } from 'react'

export default class ClockChanger extends Component {
    render() {

        const SECONDSIN25MINS = 1500;
        const SECONDSIN10MINS = 600;
        const SECONDSIN5MINS = 300;

        return (
            <div>
                <button onClick={this.props.changeClock.bind(this, SECONDSIN25MINS, true)}>Pomodoro</button>
                <button onClick={this.props.changeClock.bind(this, SECONDSIN5MINS, false)}>Short Break</button>
                <button onClick={this.props.changeClock.bind(this, SECONDSIN10MINS, false)}>Long Break</button>
            </div>
        )
    }
}
