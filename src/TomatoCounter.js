import React, { Component } from 'react';
import CommentSection from './CommentSection.js';

export default class TomatoCounter extends Component {

    editLogComment = (dayId, elementId, comment) => {
        this.props.editLogComment(dayId, elementId, comment);
    }

    render() {

        // var tomatoCount = 0;
        // var breakCount = 0;
        // for (let index = 0; index < this.props.timeElements.length; index++) {
        //     if (this.props.timeElements[index].isTomato) {
        //         tomatoCount++
        //     } else {
        //         breakCount++
        //     }
        // }

        // var elementsArray = this.props.timeElements.map((element) => {

        //     return (
        //         <div className="single-element-wrapper" key={element.id}>
        //             <div>
        //                 <button onClick={this.props.deleteElement.bind(this, element.id)} className="rm-button">x</button>
        //             </div>
        //             <div className={`time-element ${element.isTomato ? 'tomato' : 'break'}`}>
        //                 <div>
        //                     <p style={{textAlign: 'center'}}>{element.minutes}<br/>
        //                     minutes
        //                     </p>
        //                 </div>
        //             </div>
        //             <div className="log-info">
        //                 <p>Time Started: {element.timeStarted}</p>
        //                 <p>Time Completed: {element.timeStarted}</p>
        //                 <p>Date Completed: {element.dateCompleted}</p>
        //             </div>
        //             <div>
        //                 <CommentSection comment={element.comment} editingComment={element.editingComment} editLogComment={this.editLogComment.bind(this, element.id)}/>
        //             </div>
        //         </div>
        //     )
        // })

        var daysArray = this.props.daysWithWork.map( (day) => {

            var elementsArray = []

            day.timeElements.forEach( (element) => {
                elementsArray.push(
                    <div className="single-element-wrapper" key={element.id}>
                        <div>
                            <button onClick={this.props.deleteElement.bind(this, day.id, element.id)} className="rm-button">x</button>
                        </div>
                        <div className={`time-element ${element.isTomato ? 'tomato' : 'break'}`}>
                            <div>
                                <p style={{textAlign: 'center'}}>{element.minutes}<br/>
                                minutes
                                </p>
                            </div>
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
                )
            })
            return (
                <div className={'day'} key={day.id}>
                    <p className={'date'}>{day.date}</p>
                    {elementsArray}
                </div>
            )
        })

        return (

            <div>
                <h2>Pomodoros Log</h2>
                <p>This section acts as a log of the pomodoros that you have completed.</p>
                <p>If you would like to see your breaks as well, you can choose to show them from the settings menu.</p>
                {/* <p>So far, you have {tomatoCount} tomatoes completed and have taken {breakCount} beaks.</p> */}
                {/* <div className="time-elements-wrapper">
                    {elementsArray}
                </div> */}
                <div>
                    {daysArray}
                </div>
                <button onClick={this.props.clearElementsCookie}>Clear Entire Log</button>
            </div>
        )
    }
}
