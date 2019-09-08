import React, { Component } from 'react'

export default class CommentSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingComment: this.props.editingComment,
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

    openCommentToEdit = () => {
        this.setState({
            editingComment: true
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
                <p>Comment:</p>
                <p>{this.props.comment}</p>
                <button onClick={this.openCommentToEdit}>Edit Comment</button>
            </div>
        }

        return (
            <div>
                {commentSection}
            </div>
        )
    }
}
