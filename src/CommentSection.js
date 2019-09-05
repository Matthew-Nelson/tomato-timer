import React, { Component } from 'react'

export default class CommentSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingComment: true,
            comment: this.props.comment
        }
    }

    submitComment = () => {
        this.props.editLogComment(this.state.comment);
        this.setState({
            editingComment: false
        });
    }

    udpateCommentState = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    render() {

        var commentSection;
        if (this.state.editingComment === true) {
            commentSection = 
            <div>
                <textarea placeholder={'add comments about how you spent your time'} value={this.state.comment} onChange={this.udpateCommentState}></textarea>
                <button onClick={this.submitComment}>Submit</button>
            </div>
        } else {
            commentSection = 
            <div>
                NOT EDITING
            </div>
        }

        return (
            <div>
                {commentSection}
            </div>
        )
    }
}
