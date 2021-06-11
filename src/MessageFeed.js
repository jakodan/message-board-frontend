import React from 'react';
import Message from './Message.js'
import './style/index.css';
import { API_BASE_URL } from './ApiConstants.js'

const MESSAGES_URL = API_BASE_URL + "/messages"

class MessageFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            error: null,
            isLoaded: false
        }
    }

    update() {
        this.fetchMessages();
    }

    componentDidMount() {
        this.fetchMessages();
    }

    fetchMessages() {
        fetch(MESSAGES_URL)
            .then(res => {
                return res.json()
            })
            .then((result) => {
                this.setState({
                    messages: result.messages,
                    isLoaded: true
                })
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
            .finally(() => {
                this.scrollToBottom();
            })
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        if (this.el !== undefined) {
            this.el.scrollIntoView({});
        }
    }

    render() {
        const { error, isLoaded, messages } = this.state;
        if (error) {
            return <div className="messagefeed">Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div className="messagefeed">Loading...</div>
        } else {
            return (
                <div className="messagefeedcontainer">
                    <div className="messagefeed">
                        {messages.map(message => (
                            <Message key={message.id} author={message.author} text={message.text} timestamp={message.createdAt} />
                        ))}
                        <div ref={el => { this.el = el; }}></div>
                    </div>
                </div>

            )
        }
    }
}

export default MessageFeed;