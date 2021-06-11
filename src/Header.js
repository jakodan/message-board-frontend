import './style/index.css';
import AuthenticatedHeaderView from './AuthenticatedHeaderView.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style/header.css'
import SearchBar from './SearchBar.js'

function Header(props) {
    return (
        <Row className="header">
            <Col>
                <div className="logo">
                    <h3>chatapp</h3>
                </div>
            </Col>
            <Col>
                <SearchBar/>
            </Col>
            <Col>
                <AuthenticatedHeaderView
                    onAuthenticated={(token, user, newUser) => props.onAuthenticated(token, user, newUser)}
                    isLoggingIn={props.isLoggingIn}
                    authenticated={props.authenticated}
                    loggedInUser={props.loggedInUser}
                    onLogout={() => props.onLogout()} />
            </Col>
        </Row>
    )

}

export default Header;