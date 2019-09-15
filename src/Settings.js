import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.settings,
            modalOpen: false
        };
    }

    onChange = (event) => {

        var setting = event.target.name;
        var value;
        
        if (parseInt(event.target.value)) {
            value = parseInt(event.target.value);
        } else if (event.target.value === "false") {
            value = false;
        } else if (event.target.value === "true") {
            value = true;
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

    handleModalOpen = () => {
        this.setState({
            modalOpen: true
        })
    }

    handleModalClose = () => {
        this.setState({
            modalOpen: false
        })
    };

    render() {

        var alarmOptions = this.props.alarmSounds.map((option) => {
            return <option key={option.id} value={option.url}>{option.name}</option>
        })

        return (
            <div>
                <Button variant="contained" color="default" onClick={this.handleModalOpen}>Settings</Button>
                <Modal open={this.state.modalOpen} onClose={this.handleModalClose}>
                    <Fade in={this.state.modalOpen} timeout={ {enter: 500} }>
                    <div className={"modal-window"}>
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
                                <option value="0">0%</option>
                            </select>
                            <p>---</p>
                            
                            <div>
                               <p>Show breaks in log</p>
                                <label>
                                    <input
                                    type="radio"
                                    name="showBreaksInLog"
                                    value={true}
                                    checked={this.state.showBreaksInLog}
                                    onChange={this.onChange}
                                    />
                                        Yes
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    name="showBreaksInLog"
                                    value={false}
                                    checked={!this.state.showBreaksInLog}
                                    onChange={this.onChange}
                                    />
                                        No
                                </label>
                            </div>
                            
                            <p>---</p>

                            <div>
                                <p>Would you like to have the option to skip to the end of the timer? This should mainly be used for demonstration purposes. Checking 'Yes' will reveal a button upon naviagting back to the timer.</p>
                                <label>
                                    <input
                                    type="radio"
                                    name="showSkipButton"
                                    value={true}
                                    checked={this.state.showSkipButton}
                                    onChange={this.onChange}
                                    />
                                        Yes
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    name="showSkipButton"
                                    value={false}
                                    checked={!this.state.showSkipButton}
                                    onChange={this.onChange}
                                    />
                                        No
                                </label>
                            </div>

                            <p>---</p>
                            <button type="submit" value="submit">Save Settings</button>
                            <p>---</p>
                        </form>
                        <button onClick={this.restoreDefaults}>Restore Defaults</button>
                        <button onClick={this.props.clearDaysCookie}>Clear Entire Log</button>
                    </div>
                </Fade>
                </Modal>
            </div>
        )
    }

}