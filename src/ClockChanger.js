import React, { Component } from 'react'

export default class ClockChanger extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.changeClock.bind(this, 'pomodoro')}>Pomodoro</button>
                <button onClick={this.props.changeClock.bind(this, 'short')}>Short Break</button>
                <button onClick={this.props.changeClock.bind(this, 'long')}>Long Break</button>
            </div>
        )
    }
}
