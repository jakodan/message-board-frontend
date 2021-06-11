import React from 'react'
import Toast from 'react-bootstrap/Toast'
import Message from './Message.js'
import { API_BASE_URL } from './ApiConstants.js'
import ChatFooter from './ChatFooter.js'
import './style/chat.css'

const MESSAGES_URL = API_BASE_URL + "/messages"

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            error: null,
            isLoaded: false,
            expanded: props.expanded
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
        const { messages } = this.state;

        if(this.state.expanded) {
            return (
                <Toast className="chat">
                    <Toast.Header closeButton='false'>
                        <img className="rounded mr-2" alt="" />
                        <strong className="mr-auto">This is a chat</strong>
                        <small>created 11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body className="chatfeed">
                    {messages.map(message => (
                                <Message key={message.id} author={message.author} text={message.text} timestamp={message.createdAt} />
                            ))}
                            <div ref={el => { this.el = el; }}></div>

                        
    
                    </Toast.Body>
                    <ChatFooter/>
                </Toast>
            )
        }

        return (
            <Toast className="chat">
                    <Toast.Header closeButton='false'>
                        <img className="rounded mr-2" alt="" />
                        <strong className="mr-auto">This is a chat</strong>
                        <small>created 11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>
                        <p>This is a chat yo!</p>
                    </Toast.Body>
                </Toast>
        )
        
    }

}

export default Chat;