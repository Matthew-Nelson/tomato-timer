import React, { Component } from 'react';
import CommentSection from './CommentSection.js';

export default class TomatoCounter extends Component {

    editLogComment = (dayId, elementId, comment) => {
        this.props.editLogComment(dayId, elementId, comment);
    }

    render() {


        var filterDays = this.props.daysWithWork.filter( (day) => {

            return day.timeElements.length > 0;
            
        })

        
        var daysArray = filterDays.map( (day) => {

            var elementsArray = []

            day.timeElements.forEach( (element) => {
                elementsArray.push(
                    <div className={`single-element-wrapper ${element.isTomato ? 'tomato' : 'break'} ${!element.isTomato && !this.props.showBreaksInLog ? 'hide-element' : 'show-element'}`} key={element.id}>
                        <div className={`time-element ${element.isTomato ? 'tomato' : 'break'}`}>
                            <div>
                                <p style={{textAlign: 'center'}}>{element.minutes}<br/>
                                minutes
                                </p>
                            </div>
                            <div className={"element-pop-up"}>
                                <div>
                                    <button onClick={this.props.deleteElement.bind(this, day.id, element.id)} className="rm-button">Delete Element</button>
                                </div>
                                <div className="log-info">
                                    <p>Time Started: {element.timeStarted}</p>
                                    <p>Time Completed: {element.timeStarted}</p>
                                    <p>Date Completed: {element.dateCompleted}</p>
                                </div>
                                <div>
                                    <CommentSection comment={element.comment} editingComment={element.editingComment} editLogComment={this.editLogComment.bind(this, day.id, element.id)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })

            return (
                <div className={`day ${(day.timeElements.some( (element) => element.isTomato) ) ? 'has-tomatoes' : 'no-tomatoes'} ${( this.props.showBreaksInLog ) ? 'show-breaks' : 'hide-breaks'}`} key={day.id}>
                    <p className={'date'}>{day.date}</p>
                    {elementsArray}
                </div>
            )
        })

        return (

            <div>
                <h2>Pomodoros Log</h2>
                {/* <p>This section acts as a log of the pomodoros that you have completed.</p>
                <p>If you would like to see your breaks as well, you can choose to show them from the settings menu.</p> */}
                <div>
                    {daysArray}
                </div>
                <button onClick={this.props.clearElementsCookie}>Clear Entire Log</button>
                {/* move to settings */}
            </div>
        )
    }
}
