import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './style/index.css';
import { API_BASE_URL } from './ApiConstants.js'
import Button from 'react-bootstrap/Button'

const MESSAGES_URL = API_BASE_URL + "/messages"

class MessageForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isLoading: false,
            isFocused: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputRef = React.createRef();
    }

    handleChange(event) {
        this.setState({ text: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        if(this.state.text === '') {
            return
        }

        this.setState({
            isLoading: true
        })
        this.postMessage(0, uuidv4());
    }

    postMessage(attemptCount, requestKey) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
            },
            body: JSON.stringify({ text: this.state.text, requestKey: requestKey }),
            credentials: 'include'
        }
        
        fetch(MESSAGES_URL, requestOptions)
            .then(response => {
                if (response.status !== 201) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then((result) => {
                this.setState({
                    text: '',
                    isLoading: false,
                    isFocused: true
                })
                this.props.onPost();
                this.inputRef.current.focus();
            },
                (error) => {
                    if (error.message === '401') {
                        if(attemptCount < 1) {
                            this.props.refreshToken()
                                .then(() => {
                                    attemptCount++;
                                    this.postMessage(attemptCount, requestKey)
                                })
                        } else {
                            console.log("Unauthorized and already tried again. Log out");
                        }
                    } else {
                        console.log("An error occurred. Please try again later.")
                        this.setState({
                            isLoading: false,
                            isFocused: true
                        })
                    }
                })
    }

    render() {
        if (this.props.authenticated) {
            return (
                <div className="messageform">
                    <form onSubmit={this.handleSubmit}>
                        <input ref={this.inputRef} autoFocus={this.state.isFocused} disabled={this.state.isLoading} className="messageinput" type="text" value={this.state.text} onChange={this.handleChange} />
                        <Button className="messagepostbutton" type="submit" value="Submit">Post</Button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="messageform">
                    <b>Please sign in to post a message.</b>
                </div>
            )
        }

    }
}

export default MessageForm;