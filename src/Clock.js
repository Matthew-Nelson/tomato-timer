import React, { Component } from 'react';


export default class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            secondsElapsed: 0
        };
    }

    componentDidMount() {
        // this.setState({
        //     secondsLeft: this.props.startSeconds,
        // })
    }

    // static getDerivedStateFromProps(props, state) {
    //     // console.log(props);
    //     // console.log(state);
    //     return { secondsLeft: (props.startSeconds) };
    // }
        
    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    startClock = () => {
        this.props.updateClockState(true);
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    stopClock = () => {
        this.props.updateClockState(false);
        clearInterval(this.timerID);
    }

    resetClock = () => {
        this.props.updateClockState(false);
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
        
        // this.resetClock()

        return (
            <div>
                <h1>{this.props.clockLength} timer</h1>
                <h2>Start seconds: {this.props.startSeconds}</h2>
                <h2>Seconds left: {this.props.startSeconds - this.state.secondsElapsed}</h2>
                

                <div>
                    <button onClick={this.startClock.bind(this)}>Start</button>
                    <button onClick={this.stopClock.bind(this)}>Stop</button>
                    <button onClick={this.resetClock.bind(this)}>Reset</button>
                </div>
            </div>
        )
    }

}
