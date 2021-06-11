import React from 'react'
import { API_BASE_URL } from './ApiConstants.js'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const CREATE_USER_URL = API_BASE_URL + "/user"

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            isLoading: false,
            errorText: '',
            validated: false,
            isValidEmail: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
        this.setState({
            isValidEmail: validateEmail(this.state.email)
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        const form = event.currentTarget;
        
        this.setState({
            isLoading: true
        })
        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setState({
                validated: true,
                isLoading: false
            })
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, email: this.state.email, password: this.state.password }),
            credentials: 'include'
        }

        fetch(CREATE_USER_URL, requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then((result) => {
                this.setState({
                    isLoading: false
                })
                this.props.onAuthenticated(result['accessToken'], this.state.username, true)
            },
                (error) => {
                    this.setState({
                        isLoading: false
                    })
                    if (error.message === '409') {
                        console.log("User already exists")
                        this.setState({
                            errorText: 'Username already exists.'
                        })
                    } else {
                        console.log("An error occurred. Please try again later.")
                        this.setState({
                            errorText: 'An error occurred. Please try again later.'
                        })
                    }
                })
    }

    handleClose() {
        if (!this.state.isLoading) {
            this.props.onClosePopup()
        }
    }

    render() {

        if (this.props.shouldShow) {
            return (
                <>
                    <Modal show={this.props.shouldShow} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>
                                        Username
                                    </Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            placeholder="This will be your display name"
                                            onChange={this.handleInputChange}
                                            disabled={this.state.isLoading}
                                            isValid={this.state.username.length >= 2 && this.state.username.length <= 20}
                                            isInvalid={(this.state.username.length > 0 && this.state.username.length < 2) || this.state.username.length > 20}
                                            required={true}
                                            />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a username.
                                        </Form.Control.Feedback>
                                    </InputGroup>

                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Email
                                    </Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="e-mail"
                                            name="email"
                                            value={this.state.email}
                                            placeholder="user@example.com"
                                            onChange={this.handleInputChange}
                                            disabled={this.state.isLoading}
                                            isValid={this.state.isValidEmail}
                                            required
                                            ></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email.
                                        </Form.Control.Feedback>
                                    </InputGroup>

                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Password
                                    </Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            placeholder="Minimum 6 characters"
                                            onChange={this.handleInputChange}
                                            disabled={this.state.isLoading}
                                            isInvalid={this.state.password.length > 0 && this.state.password.length < 6}
                                            isValid={this.state.password.length >= 6}></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a password (minimum 6 characters).
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="password"
                                            name="password2"
                                            value={this.state.password2}
                                            placeholder="Re-enter password"
                                            onChange={this.handleInputChange}
                                            disabled={this.state.isLoading}
                                            isInvalid={this.state.password.length >= 6 && this.state.password2.length > 0 && this.state.password !== this.state.password2}
                                            isValid={this.state.password2.length >= 6 && this.state.password === this.state.password2}>

                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Passwords must match.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>


                                <Button type="submit">Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )
        }

        return null;
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default Registration;