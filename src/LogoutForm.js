import React from 'react'
import Button from 'react-bootstrap/Button';
import './style/logoutform.css'

function LogoutForm(props) {
    return (
            <Button variant="secondary" className="logoutbutton" size="sm" onClick={props.onLogout}>Sign out</Button>
    );
}

export default LogoutForm;