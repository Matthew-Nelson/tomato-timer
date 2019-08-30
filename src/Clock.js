import React, { Component } from 'react';
import ClockChanger from './ClockChanger.js';

export default class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            secondsElapsed: 0,
            clockLength: "pomodoro",
        };
    }

    componentDidMount() {
        // this.setState({
        //     secondsLeft: this.props.startSeconds,
        // })
    }

    changeClock = (newLength) => {
        this.updateClockState(false);
        this.resetClock();
        this.setState({ clockLength: newLength });
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
        this.updateClockState(false);
        clearInterval(this.timerID);
        this.setState({
            secondsElapsed: 0
        })
    }

    tick = () => {
        this.setState({
            secondsElapsed: (this.state.secondsElapsed + 1)
        })
    }

    render() {

        const SECONDSIN25MINS = 10;
        const SECONDSIN10MINS = 6;
        const SECONDSIN5MINS = 3;

        var startSeconds = 0;
        if (this.state.clockLength === "pomodoro") {
        startSeconds = SECONDSIN25MINS;
        } else if (this.state.clockLength === "long") {
        startSeconds = SECONDSIN10MINS;
        } else if (this.state.clockLength === "short") {
        startSeconds = SECONDSIN5MINS;
        }

        return (
            <div>
                <ClockChanger changeClock={this.changeClock} />
                <h1>{this.props.clockLength} timer</h1>
                <h2>Start seconds: {startSeconds}</h2>
                <h2>Seconds left: {startSeconds - this.state.secondsElapsed}</h2>
                

                <div>
                    <button onClick={this.startClock.bind(this)}>Start</button>
                    <button onClick={this.stopClock.bind(this)}>Stop</button>
                    <button onClick={this.resetClock.bind(this)}>Reset</button>
                </div>
            </div>
        )
    }

}
