import React, { Component } from 'react'

export default class TomatoCounter extends Component {
    render() {

        var tomatoCount = 0;
        for (let index = 0; index < this.props.timeElements.length; index++) {
            if (this.props.timeElements[index].isTomato) {
                tomatoCount++
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
                <p>We have {tomatoCount} tomatoes</p>
                <div className="time-elements-wrapper">
                    {elementsArray}
                </div>
            </div>
        )
    }
}
