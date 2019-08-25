import React, { Component } from 'react'

export default class Person extends Component {
    
    render() {
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
}
