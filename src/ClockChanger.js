import React, { Component } from 'react'

export default class ClockChanger extends Component {

    render() {

        return (
            <div>
                <button onClick={this.props.changeClock.bind(this, this.props.pomodoroTimeLengthSeconds, 'pomodoro')}>Pomodoro</button>
                <button onClick={this.props.changeClock.bind(this, this.props.shortBreakTimeLengthSeconds, 'short-break')}>Short Break</button>
                <button onClick={this.props.changeClock.bind(this, this.props.longBreakTimeLengthSeconds, 'long-break')}>Long Break</button>
            </div>
        )
    }
}
