import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#df443d',
            light: '#df443d',
            dark: '#df443d'
        },
    },
});

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
                <ThemeProvider theme={theme}>
                    <TextField
                        label="Comments"
                        value={this.state.comment}
                        onChange={this.udpateCommentState}
                        variant="filled"
                        placeholder="How you spent your time?"
                        style={{marginBottom: '1rem', width: '100%'}}
                    />
                    <Button variant="outlined" className="submit" onClick={this.submitComment} style={{width: '100%'}}>Submit</Button>
                </ThemeProvider>
            </div>
        } else {
            commentSection = 
            <div>
                <p>{this.props.comment}</p>
                <Button variant="contained" onClick={this.openCommentToEdit} style={{width: '100%', backgroundColor: '#d6d6d6'}}>Edit Comment</Button>
            </div>
        }

        return (
            <div>
                <p style={{marginTop: '0'}}><strong>Comments:</strong></p>
                {commentSection}
            </div>
        )
    }
}
