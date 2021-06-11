import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './style/successmodal.css'

function SuccessModal(props) {
    return (
        <Modal className="successmodal" show={props.show} onHide={() => props.onClose()}>
            <Modal.Header closeButton >
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => props.onClose()}>
                    {props.primaryButtonText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SuccessModal;