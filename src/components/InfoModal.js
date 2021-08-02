import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import InfoToolTipIcon from './InfoToolTipIcon';

export default function InfoModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalLineOne = 'Fill in the property details to perform a property search.';
    const modalLineTwo = 'Once the results are returned, you will be able to adjust the expected rent, expenses, and mortgage information on the right side of the screen.';

    return (
        <>
            <button onClick={handleShow} type="button" data-toggle="modal" data-target="#infoModal" className="btn btn-light btn-lg">
                < InfoToolTipIcon height={20} weight={20} side={'None'} text={''}/>
                &nbsp;How Does This Site Work?
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color: 'black'}}>
                    <b>1)&nbsp;</b>{modalLineOne}
                    <br></br>
                    <br></br>
                    <b>2)&nbsp;</b>{modalLineTwo}
                </Modal.Body>
            </Modal>
        </>
    )
}