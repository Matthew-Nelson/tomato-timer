import React, { Component } from 'react'

export default class TomatoCounter extends Component {
    render() {

        var tomatoCount = 0;
        var breakCount = 0;
        for (let index = 0; index < this.props.timeElements.length; index++) {
            if (this.props.timeElements[index].isTomato) {
                tomatoCount++
            } else {
                breakCount++
            }
        }

        var elementsArray = this.props.timeElements.map((element) => {

            

            return (
                <div className="row" key={element.id}>
                    <div>
                        <button onClick={this.props.deleteElement.bind(this, element.id)} className="rm-button">x</button>
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
                        
                        <textarea key={element.id} placeholder="enter your comments"/>
                        <button onClick={this.props.submitComment}>Submit</button>
                    </div>
                </div>
            )
        })

        return (

            <div>
                <h2>Completed Time Segments</h2>
                <p>This section acts as a log of the pomodoros and break that you have completed.</p>
                <p>So far, you have {tomatoCount} tomatoes completed and have taken {breakCount} beaks.</p>
                <div className="time-elements-wrapper">
                    {elementsArray}
                </div>
                <button onClick={this.props.clearElementsCookie}>Clear Log</button>
            </div>
        )
    }
}
