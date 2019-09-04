import React, { Component } from 'react';
import ClockChanger from './ClockChanger.js';

export default class Clock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRunning: false,
            secondsElapsed: 0
        };
    }

    displayMessage = () => {
        
        var message = "";
        if (this.state.isRunning === false && this.props.timerType === 'pomodoro' && this.props.startSeconds !== this.state.secondsElapsed) {
            message = "Start the clock and get to work!";
        } else if (this.state.isRunning === false && this.props.timerType === 'pomodoro' && this.props.startSeconds === this.state.secondsElapsed) {
            message = "Good job! You made it to the break. Select whether you are going to take a short or long break."
        } else if (this.state.isRunning === true && this.props.timerType === 'pomodoro') {
            message = "You're on the clock, keep focused on the task at hand!"
        } else if (this.state.isRunning === false && this.props.timerType !== 'pomodoro' && this.props.startSeconds !== this.state.secondsElapsed) {
            message = "Start the clock and take your well earned break!"
        } else if (this.state.isRunning === false && this.props.timerType !== 'pomodoro' && this.props.startSeconds === this.state.secondsElapsed) {
            message = "Select whether you are headed back to a 'pomodoro' or if you want to take a longer break."
        } else if (this.state.isRunning === true && this.props.timerType !== 'pomodoro') {
            message = "You're on your break. Get up, stretch, grab a snack or water if needed and relax!"
        }

        return <p>{message}</p>
    }

    changeClock = (newLength, newTimerType) => {

        this.props.passVarsUp(newLength, newTimerType);
        
        this.updateClockState(false);
        
        this.resetClock();

    }

    updateClockState = (clockState) => {
        this.setState({
            isRunning: clockState
        })
    }
        
    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    startClock = () => {
        
        if (!this.state.isRunning) {
            if (this.props.startSeconds === this.state.secondsElapsed) {
                this.resetClock();
            }
            this.updateClockState(true);
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }

    }

    stopClock = () => {
        this.updateClockState(false);
        clearInterval(this.timerID);
    }

    resetClock = () => {
        this.stopClock();
        this.changeTitle(false);
        this.setState({
            secondsElapsed: 0
        });
    }

    tick = () => {
        this.setState({
            secondsElapsed: (this.state.secondsElapsed + 1)
        })

        this.changeTitle(true);

        if (this.state.secondsElapsed === this.props.startSeconds) {
            this.stopClock();
            this.props.finishTimer(this.props.timerType, this.props.startSeconds);
        }
    }

    changeTitle = (showTimeInTitle) => {
        var title = 'Pomodoro';

        if (showTimeInTitle === false) {
            document.title = title;
        } else {
            var fomattedTime = this.formatSeconds(this.props.startSeconds - this.state.secondsElapsed);
            document.title = `${title} (${fomattedTime})`;
        }
    }

    skipToEnd = () => {
        this.setState({
            secondsElapsed: (this.props.startSeconds - 4)
        }, () => {
            if (!this.state.isRunning)
                this.startClock()
        })
    }

    formatSeconds = (origSec) => {
        var hours   = Math.floor(origSec / 3600);
        var minutes = Math.floor((origSec - (hours * 3600)) / 60);
        var seconds = origSec - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = `0${hours}:`
            if (hours === '00:') {
                hours = '';
            }
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${hours}${minutes}:${seconds}`;
    }
    

    render() {

        return (
            <div>
                {this.displayMessage()}
                
                <ClockChanger changeClock={this.changeClock} pomodoroTimeLengthSeconds={this.props.pomodoroTimeLengthSeconds} shortBreakTimeLengthSeconds={this.props.shortBreakTimeLengthSeconds} longBreakTimeLengthSeconds={this.props.longBreakTimeLengthSeconds}/>
                
                

                <h2 style={clockStyle}>{this.formatSeconds(this.props.startSeconds - this.state.secondsElapsed)}</h2>
                
                <div>
                    <button onClick={this.startClock}>Start</button>
                    <button onClick={this.stopClock}>Stop</button>
                    <button onClick={this.resetClock}>Reset</button>
                </div>

                <div style={demonstrationStyle}>
                    <p style={{marginTop: 0}}>For demonstration purposes, feel free to skip to the end of the timer:</p>
                    <button onClick={this.skipToEnd}>Skip to end of Timer</button>
                </div>
                

            </div>
        )
    }
}

const clockStyle = {
    display: 'inline-block',
    padding: '1rem',
    border: '1px solid red'
}

const demonstrationStyle = {
    border: '1px dotted grey',
    padding: '1rem',
    margin: '1rem 0'
}