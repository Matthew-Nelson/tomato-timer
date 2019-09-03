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
                <div key={element.id} className={`time-element ${element.isTomato ? 'tomato' : 'break'}`}>
                    <button onClick={this.props.deleteElement.bind(this, element.id)} href="/" className="rm-button">x</button>
                    <div>
                        <p>{element.minutes}</p>
                    </div>
                </div>
            )
        })

        return (

            <div>
                <h2>COMPLETED SEGMENTS</h2>
                <p>We have {tomatoCount} tomatoes completed</p>
                <p>We have taken {breakCount} beaks</p>
                <button onClick={this.props.clearElementsCookie}>Clear Log</button>
                <div className="time-elements-wrapper">
                    {elementsArray}
                </div>
            </div>
        )
    }
}
