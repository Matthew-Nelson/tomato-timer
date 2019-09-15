import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';


export default class FAQ extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
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
        return (
            <div>
                <Button variant="contained" color="default" onClick={this.handleModalOpen}>More Info</Button>
                <Modal open={this.state.modalOpen} onClose={this.handleModalClose} >
                    <Fade in={this.state.modalOpen} timeout={ {enter: 500} }>
                        <div className={'modal-window'}>
                            <h2>Instructions and More Information</h2>

                            <p>The Pomodoro Technique is a simple yet effective method of time management that aims to improve work and study habits through structured "work" (or "pomodoro") and "break" segments. This technique was created by Francesco Cirillo and helps keep the user on task and focused during the "work" segments, while giving them adequate time for rest and recouperation during the "break" segments. This technique helps reduce the chances of burnout and can be an effective strategy towards increasing productivity. Learn more about the Pomodoro Technique on <a href="https://francescocirillo.com/pages/pomodoro-technique" target="_blank" rel="noopener noreferrer">Francesco Cirillo's website</a>.</p>

                            <p>This application, the TomatoTracker, provides the user with a timer that will accurately track the user's time spent during a "pomodoro" or break and log their completed time segments. This gives the user a sense of accomplishment and a graphical representation of their hard work! The user can also log comments to each of their time segments to see how they spent their time. This will aid when reviewing the work completed but also give the user a better ability to estimate the time needed to complete certain tasks in the future.</p>

                            <p>The basics are:</p>
                            <ol>
                                <li>Start the "Pomodoro" timer and work for 25 minutes. Make an effort to avoid distractions during this time.</li>
                                <li>Take a 5 minute break! You've earned it. Get up, stretch, meditate, grab a cup of coffee or even browse social media.</li>
                                <li>Rinse and repeat until you have completed 4 Pomodoros.</li>
                                <li>After completing 4 Pomodoros, take a 10 minute break. This longer break ensures that you are giving yourself enough time to rest and digest the information from your work or study sessions.</li>
                                <li>Continue this cycle as needed!</li>
                            </ol>

                            <p>This app was inspired by:</p>
                            <ol>
                                <li><a href="https://tomato-timer.com/" target="_blank" rel="noopener noreferrer">TomatoTimer</a></li>
                                <li><a href="http://tomatoi.st/" target="_blank" rel="noopener noreferrer">Tomatoist</a></li>
                            </ol>

                            <p>This application was built using the React Javascript framework and was done as a challenge to push myself to learn more about these technologies and to also provide myself with a useful tool for my future productivity. This application uses cookies to store the settings and Pomodoro data.</p>

                            <p>Why use this app?</p>

                            <p>This application gives the user an easy to use Pomodoro Timer that also allows them to track their time spent working and create detailed logs of how they spent their time.</p>
                            
                            <p>Features and settings include:</p>
                            <ol>
                                <li>Customize Pomodoro and Break times</li>
                                <li>Pick from a selection of alarm sounds</li>
                                <li>Adjust alarm volume</li>
                                <li>Toggle between showing only Pomodoros or showing Pomodoros and Breaks in the log</li>
                                <li>A "skip to the end of the timer" button. This is mainly used for demonstration purposes</li>
                            </ol>

                            <p>Find me on the following platforms:</p>
                            <ul>
                                <li><a href="https://github.com/Matthew-Nelson" target="_blank" rel="noopener noreferrer">My Github</a></li>
                                <li><a href="https://www.linkedin.com/in/matthewbnelson/" target="_blank" rel="noopener noreferrer">My 
                                LinkedIn</a></li>
                                <li><a href="https://mattnelson.dev/" target="_blank" rel="noopener noreferrer">My personal site</a></li>
                            </ul>

                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }
}
