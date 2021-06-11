import React from 'react';
import './style/index.css';
import Registration from './Registration.js'
import { API_BASE_URL } from './ApiConstants.js'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './style/loginform.css'

const AUTH_URL = API_BASE_URL + "/auth/token"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: props.isLoggingIn,
            showingRegistration: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        this.setState({
            isLoading: true
        })
        event.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password }),
            credentials: 'include'
        }
        fetch(AUTH_URL, requestOptions)
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
                this.props.onAuthenticated(result['accessToken'], this.state.username)
            },
                (error) => {
                    this.setState({
                        isLoading: false
                    })
                    if (error.message === '401') {
                        console.log("Invalid username or password")
                    } else {
                        console.log("An error occurred. Please try again later.")
                    }
                })
    }

    handleCloseRegisterPopup() {
        this.setState({
            showingRegistration: false
        })
    }

    render() {
        return (
            <Row className="loginform">
                <Form inline onSubmit={this.handleSubmit}>
                    <Form.Control
                        id="inlineFormInputUsername"
                        className="mb-2 mr-sm-2"
                        size="sm"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        disabled={this.state.isLoading}
                    />
                    <Form.Control
                        id="inlineFormInputPassword"
                        className="mb-2 mr-sm-2"
                        size="sm"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        disabled={this.state.isLoading}
                    />
                    <Button size="sm" className="mb-2" variant="primary" type="submit">
                        Sign in
                                        </Button>
                    <Button className="mb-2" variant="secondary" size="sm" type="button" onClick={() => this.setState({ showingRegistration: true })}>
                        Register
                                </Button>
                </Form>
                <Registration
                    onClosePopup={() => this.handleCloseRegisterPopup()}
                    shouldShow={this.state.showingRegistration}
                    onAuthenticated={this.props.onAuthenticated}
                />

            </Row>

        )
    }
}

export default LoginForm;