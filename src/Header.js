import React from 'react';
import FAQ from './FAQ.js';
import Settings from './Settings.js';
import Container from '@material-ui/core/Container';

export default function Header(props) {
    return (
        
        <div className={"header-container"}>
            <Container className="header" maxWidth="md">
                <h1>TomatoTracker</h1>
                <div className={"header-buttons"}>
                    <FAQ />
                    <Settings alarmSounds={props.alarmSounds} defaultSettings={props.defaultSettings} settings={props.settings} updateSettings={props.updateSettings} clearSettingsCookie={props.clearSettingsCookie} restoreCurrentClockCookie={props.restoreCurrentClockCookie} clearDaysCookie={props.clearDaysCookie}/>
                </div>
            </Container>
        </div>
        
    )
}
