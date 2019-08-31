import React, { Component } from 'react'

export default class TomatoCounter extends Component {
    render() {
        return (
            <div>
                <p>We have {this.props.tomatoCount} tomatoes</p>
                <br/>
                <div>
                    {this.props.timeElements.map((element, index) => (
                        <div key={index} className={`time-element ${element.isTomato ? 'tomato' : 'break'}`}>{element.minutes}</div>
                    ))}
                </div>
            </div>
        )
    }
}
