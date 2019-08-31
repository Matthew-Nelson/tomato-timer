import React, { Component } from 'react';
import ClockChanger from './ClockChanger.js';

export default class Clock extends Component {

    constructor(props) {
        super(props);
        const SECONDSIN25MINS = 1500;

        this.state = {
            isRunning: false,
            secondsElapsed: 0,
            startSeconds: SECONDSIN25MINS,
            pomodoro: true
        };
    }

    componentDidMount() { 

    }

    changeClock = (newLength, isPomordoro) => {
        this.updateClockState(false);
        this.resetClock();
        this.setState({ 
            startSeconds: newLength,
            pomodoro: isPomordoro
        });

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
        this.updateClockState(true);
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    stopClock = () => {
        this.updateClockState(false);
        clearInterval(this.timerID);
    }

    resetClock = () => {
        this.stopClock()
        this.setState({
            secondsElapsed: 0
        })
    }

    tick = () => {
        this.setState({
            secondsElapsed: (this.state.secondsElapsed + 1)
        })
        if (this.state.secondsElapsed === this.state.startSeconds) {
            this.stopClock();
            this.props.finishTimer(this.state.pomodoro, this.state.startSeconds);
        }
    }

    skipToEnd = () => {
        this.setState({
            secondsElapsed: (this.state.startSeconds - 2)
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
            hours = `0${hours} : `
            if (hours === '00 : ') {
                hours = '';
            }
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${hours}${minutes} : ${seconds}`;
    }
    

    render() {

        return (
            <div>
                <ClockChanger changeClock={this.changeClock} />
                
                <h2>{this.state.pomodoro === true ? 'Pomodoro' : 'Break'} timer</h2>
                
                <h2 style={clockStyle}>{this.formatSeconds(this.state.startSeconds - this.state.secondsElapsed)}</h2>
                
                <div>
                    <button onClick={this.startClock}>Start</button>
                    <button onClick={this.stopClock}>Stop</button>
                    <button onClick={this.resetClock}>Reset</button>
                </div>

                <button onClick={this.skipToEnd}>Skip to end of Timer</button>

            </div>
        )
    }
}

const clockStyle = {
    display: 'inline-block',
    padding: '1rem',
    border: '1px solid red'
}