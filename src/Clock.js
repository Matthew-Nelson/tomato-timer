import React, { Component } from 'react';
import ClockChanger from './ClockChanger.js';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export default class Clock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRunning: false,
            secondsElapsed: 0,
            timeStarted: {}
        };
    }

    displayMessage = () => {
        
        var message = "";
        if (this.state.isRunning === false && this.props.timerType === 'pomodoro' && this.props.startSeconds !== this.state.secondsElapsed) {
            message = "Start the clock and get to work!";
        } else if (this.state.isRunning === false && this.props.timerType === 'pomodoro' && this.props.startSeconds === this.state.secondsElapsed) {
            message = <span><p>You completed your pomodoro! Good Job!</p><p>Select whether you want to take a short or a long break.</p></span>
        } else if (this.state.isRunning === true && this.props.timerType === 'pomodoro') {
            message = "You're on the clock, keep focused on the task at hand!"
        } else if (this.state.isRunning === false && this.props.timerType !== 'pomodoro' && this.props.startSeconds !== this.state.secondsElapsed) {
            message = "Start the clock and take your well earned break!"
        } else if (this.state.isRunning === false && this.props.timerType !== 'pomodoro' && this.props.startSeconds === this.state.secondsElapsed) {
            message = "Click the pomodoro button above and start your next segment of focused work."
        } else if (this.state.isRunning === true && this.props.timerType !== 'pomodoro') {
            message = "You're on your break! Get up, stretch, grab a snack or water if needed and relax!"
        }
        
        return <h3 className="encouragement">{message}</h3>
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


    startClock = (didSkip) => {
        
        if (!this.state.isRunning) {
            
            if (this.props.startSeconds === this.state.secondsElapsed) {
                this.resetClock();
            }

            if (this.state.secondsElapsed === 0 || this.state.secondsElapsed - this.props.startSeconds === 0 || didSkip) {
                this.setState({
                    timeStarted: new Date()
                })
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
            secondsElapsed: 0,
            timeStarted: {}
        });
    }

    tick = () => {
        this.setState({
            secondsElapsed: (this.state.secondsElapsed + 1)
        })

        this.changeTitle(true);

        if (this.state.secondsElapsed === this.props.startSeconds) {
            this.stopClock();
            this.props.finishTimer(this.props.timerType, this.props.startSeconds, this.state.timeStarted);
        }
    }

    changeTitle = (showTimeInTitle) => {
        var title = 'TomatoTracker';

        if (showTimeInTitle === false) {
            document.title = title;
        } else {
            var fomattedTime = this.formatSeconds(this.props.startSeconds - this.state.secondsElapsed);
            document.title = `${title} (${fomattedTime})`;
        }
    }

    skipToEnd = () => {
        this.setState({
            secondsElapsed: (this.props.startSeconds - 2),
        }, () => {
            if (!this.state.isRunning)
                this.startClock(true)
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

        var skipToEnd;
        if (this.props.showSkipButton) {
            skipToEnd = 
                <Paper className={"skip-wrapper"} elevation={4}>
                    <div className={"skip-to-end"}>
                        <p>For demonstration purposes, feel free to skip to the end of the timer</p>
                        <Button variant="outlined" color="default" onClick={this.skipToEnd}>Skip to end of Timer</Button>
                    </div>
                </Paper>
        }

        return (
            <div className={"clock-container"}>
                
                <ClockChanger changeClock={this.changeClock} pomodoroTimeLengthSeconds={this.props.pomodoroTimeLengthSeconds} shortBreakTimeLengthSeconds={this.props.shortBreakTimeLengthSeconds} longBreakTimeLengthSeconds={this.props.longBreakTimeLengthSeconds}/>
                
                

                <h2 id={"clock"}>{this.formatSeconds(this.props.startSeconds - this.state.secondsElapsed)}</h2>
                
                <div className={"clock-controls"}>
                    <Button className={"start"} variant="contained" color="default" onClick={this.startClock}>Start</Button>
                    <Button className={"stop"} variant="contained" color="default" onClick={this.stopClock}>Stop</Button>
                    <Button variant="contained" color="default" onClick={this.resetClock}>Reset</Button>
                </div>

                {this.displayMessage()}

                {skipToEnd}

            </div>
        )
    }
}