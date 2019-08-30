import React, { Component } from 'react'

export default class ClockChanger extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.changeClock.bind(this, 10, true)}>Pomodoro</button>
                <button onClick={this.props.changeClock.bind(this, 3, false)}>Short Break</button>
                <button onClick={this.props.changeClock.bind(this, 6, false)}>Long Break</button>
            </div>
        )
    }
}
