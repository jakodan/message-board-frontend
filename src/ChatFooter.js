import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './style/chatfooter.css'

function ChatFooter() {
    return (
        <Form className="chatfooter">
            <InputGroup size="sm">
                <FormControl className="inputbar" placeholder="Write something" />
                <Button type="button" size="sm" variation="secondary">
                    Send
                    </Button>
            </InputGroup>
        </Form>
    )
}

export default ChatFooter;