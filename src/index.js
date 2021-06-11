import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Header from './Header.js'
import MessageForm from './MessageForm.js'
import MessageFeed from './MessageFeed.js'
import { API_BASE_URL } from './ApiConstants.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessModal from './SuccessModal.js'
import ChatBoard from './ChatBoard.js';

const REFRESH_URL = API_BASE_URL + "/auth/refresh"

class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
        this.messageFeed = React.createRef();
        this.state = {
            authenticated: false,
            token: '',
            isLoggingIn: false,
            loggedInUser: '',
            shouldShowWelcomeModal: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            this.setState({
                isLoggingIn: true
            })
            this.refreshToken();
        } else {
            this.setState({
                isLoggingIn: false
            })
        }
    }

    handleAuthenticated(token, user, isNewUser = false) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', user);
        this.setState({
            authenticated: true,
            token: token,
            loggedInUser: user,
            shouldShowWelcomeModal: isNewUser
        })
    }

    handleLogout() {
        fetch(REFRESH_URL, { method: 'DELETE', credentials: 'include' })
            .then(() => {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.removeItem('loggedInUser')
                this.setState({
                    authenticated: false,
                    token: ''
                })
            })
    }

    handlePost() {
        this.messageFeed.current.update()
    }

    handleCloseSuccessModal() {
        this.setState({
            shouldShowWelcomeModal: false
        })
    }

    refreshToken() {
        return fetch(REFRESH_URL, { method: 'POST', credentials: 'include' })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then((result) => {
                this.setState({
                    authenticated: true,
                    token: result['accessToken'],
                    isLoggingIn: false,
                    loggedInUser: result['username'],
                })
            }, (error) => {
                console.log("Logging out")
                localStorage.setItem('isLoggedIn', 'false')
                this.setState({
                    authenticated: false,
                    token: '',
                    isLoggingIn: false
                })
            })
    }

    render() {
        return (
            <div className="messageboard">
                <Header
                    authenticated={this.state.authenticated}
                    onAuthenticated={(token, user, newUser) => this.handleAuthenticated(token, user, newUser)}
                    onLogout={() => this.handleLogout()}
                    isLoggingIn={this.state.isLoggingIn}
                    loggedInUser={this.state.loggedInUser}
                />
                <ChatBoard/>
                <MessageFeed ref={this.messageFeed} />
                <MessageForm
                    authenticated={this.state.authenticated}
                    token={this.state.token}
                    onPost={() => this.handlePost()}
                    refreshToken={() => this.refreshToken()} />
                <SuccessModal
                    onClose={() => this.handleCloseSuccessModal()}
                    show={this.state.shouldShowWelcomeModal}
                    title="Success!"
                    body="Congratulations on creating your Chattapp account!"
                    primaryButtonText="Start chatting"
                />
            </div>
        )
    }

}

ReactDOM.render(
    <MessageBoard />,
    document.getElementById('root')
);