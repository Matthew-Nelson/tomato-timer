import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class ClockChanger extends Component {

    render() {

        return (
            <div className={"clock-changer"}>
                <Button variant="outlined" color="" onClick={this.props.changeClock.bind(this, this.props.pomodoroTimeLengthSeconds, 'pomodoro')}>Pomodoro</Button>
                <Button variant="outlined" color="" onClick={this.props.changeClock.bind(this, this.props.shortBreakTimeLengthSeconds, 'short-break')}>Short Break</Button>
                <Button variant="outlined" color="" onClick={this.props.changeClock.bind(this, this.props.longBreakTimeLengthSeconds, 'long-break')}>Long Break</Button>
            </div>
        )
    }
}
