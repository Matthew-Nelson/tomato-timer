import React, { Component } from 'react';
import ClockChanger from './ClockChanger.js';

export default class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            secondsElapsed: 0,
            startSeconds: 10,
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
            if (this.state.pomodoro === true) {
                this.stopClock();
                this.props.incrementTomatoCounter();
            } else {
                this.stopClock();
            }
        }
    }

    render() {

        return (
            <div>
                <ClockChanger changeClock={this.changeClock} />
                
                <h1>{this.state.pomodoro === true ? 'Pomodoro' : 'Break'} timer</h1>
                <h2>Start seconds: {this.state.startSeconds}</h2>
                <h2>Seconds left: {this.state.startSeconds - this.state.secondsElapsed}</h2>
                

                <div>
                    <button onClick={this.startClock.bind(this)}>Start</button>
                    <button onClick={this.stopClock.bind(this)}>Stop</button>
                    <button onClick={this.resetClock.bind(this)}>Reset</button>
                </div>

                <button onClick={this.props.incrementTomatoCounter}>INCREMENT COUNTER</button>

            </div>
        )
    }

}
