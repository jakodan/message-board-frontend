import React from 'react';
import LogoutForm from './LogoutForm.js'
import LoginForm from './LoginForm.js'
import './style/authenticatedheaderview.css'

function AuthenticatedHeaderView(props) {
    if (props.authenticated) {
        return (
            <div className="logoutform" >
                <span>Welcome, {props.loggedInUser}</span>
                <LogoutForm onLogout={() => props.onLogout()} />
            </div>
        )
    }

    return (
        <LoginForm
                className="loginform"
                onAuthenticated={(token, user, newUser) => props.onAuthenticated(token, user, newUser)}
                isLoggingIn={props.isLoggingIn}
            />

    )

}

export default AuthenticatedHeaderView