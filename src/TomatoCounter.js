import React, { Component } from 'react'

export default class TomatoCounter extends Component {
    render() {
        return (
            <div>
                We have {this.props.tomatoes} tomatoes
            </div>
        )
    }
}
