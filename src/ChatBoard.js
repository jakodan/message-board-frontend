import React from 'react'
import Chat from './Chat.js'
import Row from 'react-bootstrap/Row'
import './style/chatboard.css'

function ChatBoard(props) {
    if(true) {
        return null;
    }
    return (
        <Row className="chatboard">
            <Chat expanded={false}/>
            <Chat expanded={true}/>
        </Row>

    )
}

export default ChatBoard;