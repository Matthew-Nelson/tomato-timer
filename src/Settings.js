import React, { Component } from 'react';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.settings
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (event) => {

        var setting = event.target.name;
        var value;
        
        if (parseInt(event.target.value)) {
            value = parseInt(event.target.value);
        } else {
            value = event.target.value;
        }

        this.setState({
            [setting]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.updateSettings(this.state);
    }

    restoreDefaults = () => {
        this.setState({
            ...this.props.defaultSettings
        }, () => {
            this.props.clearSettingsCookie();
            this.props.restoreCurrentClockCookie();
        })
    }



    render() {

        var alarmOptions = this.props.alarmSounds.map((option) => {
            return <option key={option.id} value={option.url}>{option.name}</option>
        })

        return (
            <div>
                <h2>SETTINGS</h2>
                <form onSubmit={this.onSubmit} id="settings" >
                    <p><strong>Custom Timer Times</strong></p>
                    <div>
                        <p>Pomodoro Time:</p>
                        <input type="number" name="pomodoroTimeLengthMinutes" value={this.state.pomodoroTimeLengthMinutes} onChange={this.onChange} />
                        <p>Short Break Time:</p>
                        <input type="number" name="shortBreakTimeLengthMinutes" value={this.state.shortBreakTimeLengthMinutes} onChange={this.onChange}/>
                        <p>Long Break Time:</p>
                        <input type="number" name="longBreakTimeLengthMinutes" value={this.state.longBreakTimeLengthMinutes} onChange={this.onChange}/>
                    </div>
                    <p>---</p>
                    <p><strong>Sound Picker</strong></p>
                    <select name="alarmSoundUrl" onChange={this.onChange} value={this.state.alarmSoundUrl}>
                        {alarmOptions}
                    </select>
                    <p>---</p>
                    <p><strong>Adjust Volume</strong></p>
                    <select name="alarmVolumePercent" onChange={this.onChange} value={this.state.alarmVolumePercent}>
                        <option value="100">100%</option>
                        <option value="75">75%</option>
                        <option value="50">50%</option>
                        <option value="25">25%</option>
                    </select>
                    <p>---</p>
                </form>
                <button onClick={this.restoreDefaults}>Restore Defaults</button>
            </div>
        )
    }
}
