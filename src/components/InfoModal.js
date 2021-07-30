import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function InfoModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} type="button" data-toggle="modal" data-target="#infoModal" className="btn btn-light btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle p-0 m-0" viewBox="0 0 20 20">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            &nbsp;How Does This Site Work?</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color: 'black'}}>
                    <b>1)&nbsp;</b>Fill in the property details to perform a property search.
                    <br></br>
                    <br></br>
                    <b>2)&nbsp;</b>Once the results are returned, you will be able to adjust the expected rent, expenses, and mortgage information on the right side of the screen.
                </Modal.Body>
            </Modal>
        </>
    )
}