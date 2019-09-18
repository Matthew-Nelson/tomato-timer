import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#df443d',
            light: '#df443d',
            dark: '#df443d'
        },
    },
});

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
        }, () => {
            // update the settings on each change. This allows the user to close the modal and have the settings be updated without having to hit the "submit button"
            this.props.updateSettings(this.state);
        });
    }

    onSubmit = (event) => {
        // removed the settings update on submit button. The submit button is a glorified close button at this point
        // button was kept in so the user can hit enter and the modal will close as expected
        event.preventDefault();
        this.handleModalClose();
    }

    restoreDefaults = () => {
        this.setState({
            ...this.props.defaultSettings
        }, () => {
            this.props.clearSettingsCookie();
            this.props.restoreCurrentClockCookie();
        })
    }

    testAlarmSound = () => {
        var promise = document.querySelector('#alarm-audio').play();
        if (promise !== undefined) {
            promise.catch(error => {
                // Auto-play was prevented
                console.log(error);
            }).then(() => {
                // Auto-play started
            });
        }
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
            return <MenuItem key={option.id} value={option.url}> {option.name}</MenuItem>
        })

        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="default" onClick={this.handleModalOpen}>Settings</Button>
                    <Modal open={this.state.modalOpen} onClose={this.handleModalClose}>
                        <Fade in={this.state.modalOpen} timeout={ {enter: 500} }>
                            <div className={"modal-window"}>
                                <div className={"modal-inner-wrapper"}>
                                    <Fab className="modal-close" onClick={this.handleModalClose}>
                                        <AddIcon />
                                    </Fab>
                                    <form onSubmit={this.onSubmit} id="settings" >
                                        <h2>Settings</h2>
                                        <div className={"setting custom-times"}>
                                            <p>Custom Timer Times</p>
                                            <div className={"times-wrapper"}>
                                                <TextField
                                                    name="pomodoroTimeLengthMinutes"
                                                    label="Pomodoro Minutes"
                                                    type="number"
                                                    value={this.state.pomodoroTimeLengthMinutes}
                                                    onChange={this.onChange}
                                                    variant="filled"
                                                />
                                                <TextField
                                                    name="shortBreakTimeLengthMinutes"
                                                    label="Short Break Minutes"
                                                    type="number"
                                                    value={this.state.shortBreakTimeLengthMinutes}
                                                    onChange={this.onChange}
                                                    variant="filled"
                                                />
                                                <TextField
                                                    name="longBreakTimeLengthMinutes"
                                                    label="Long Break Minutes"
                                                    type="number"
                                                    value={this.state.longBreakTimeLengthMinutes}
                                                    onChange={this.onChange}
                                                    variant="filled"
                                                />
                                            </div>
                                        </div>
                                        <hr className="add-margin"/>
                                        {/* <div className={"setting sound-picker"}>
                                            <p>Pick Alarm Sound</p>
                                            
                                        </div> */}
                                        <div className={"setting sound-settings"}>
                                            <p>Sound Settings</p>
                                            {/* <div> */}
                                            <div className="inner-wrapper">
                                                <TextField
                                                    name="alarmSoundUrl"
                                                    select
                                                    label="Alarm Sound"
                                                    value={this.state.alarmSoundUrl}
                                                    onChange={this.onChange}
                                                    variant="filled"
                                                >                                        
                                                    {alarmOptions}
                                                </TextField>
                                                <TextField 
                                                    name="alarmVolumePercent"
                                                    select
                                                    label="Alarm Volume"
                                                    value={this.state.alarmVolumePercent}
                                                    onChange={this.onChange}
                                                    variant="filled"
                                                >
                                                    <MenuItem key={100} value={100}>100</MenuItem>
                                                    <MenuItem key={75} value={75}>75</MenuItem>
                                                    <MenuItem key={50} value={50}>50</MenuItem>
                                                    <MenuItem key={25} value={25}>25</MenuItem>
                                                    <MenuItem key={0} value={0}>0</MenuItem>
                                                </TextField>
                                                <Button className={"submit"} color="default" variant="outlined" onClick={this.testAlarmSound}>Test Alarm </Button>
                                            </div>
                                        </div>
                                        <hr className="add-margin"/>
                                        <div className="breaks-skip-wrapper">
                                            <div className={"setting show-breaks"}>
                                                <p>Show breaks in log</p>
                                                <RadioGroup>
                                                    <FormControlLabel
                                                        label="Yes"
                                                        control={<Radio
                                                            value={true}
                                                            name={"showBreaksInLog"}
                                                            checked={this.state.showBreaksInLog}
                                                            onChange={this.onChange}
                                                            color="primary"
                                                        />}
                                                    />
                                                    <FormControlLabel
                                                        label="No"
                                                        control={<Radio
                                                            value={false}
                                                            name={"showBreaksInLog"}
                                                            checked={!this.state.showBreaksInLog}
                                                            onChange={this.onChange}
                                                            color="primary"
                                                        />}
                                                    />  
                                                </RadioGroup>
                                            </div>
                                            <hr/>
                                            <div className="setting show-skip-button">
                                                <p>Show Skip Button<br/>(For Demonstration Purposes)</p>
                                                <RadioGroup>
                                                    <FormControlLabel
                                                        label="Yes"
                                                        control={<Radio
                                                            value={true}
                                                            name={"showSkipButton"}
                                                            checked={this.state.showSkipButton}
                                                            onChange={this.onChange}
                                                            color="primary"
                                                        />}
                                                    />
                                                    <FormControlLabel
                                                        label="No"
                                                        control={<Radio
                                                            value={false}
                                                            name={"showSkipButton"}
                                                            checked={!this.state.showSkipButton}
                                                            onChange={this.onChange}
                                                            color="primary"
                                                        />}
                                                    />  
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="button-wrapper"> 
                                            <Button className={"submit"} color="default" variant="outlined" type="submit" value="submit">Save Settings</Button>
                                            <Button className={"clear"} color="default" variant="outlined" onClick={this.restoreDefaults}>Restore Defaults</Button>
                                        </div>
                                        <hr/>
                                        <div className="button-wrapper lower">
                                            <Button className={"stop"} color="default" variant="contained" onClick={this.props.clearDaysCookie}>Clear Pomodoro Log</Button>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </ThemeProvider>
            </div>
        )
    }

}