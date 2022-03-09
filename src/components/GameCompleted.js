import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const GameCompleted = (props) => {
    const { isOpen, clicked, toggleModal } = props;

    return (
        <Modal isOpen={isOpen} toggle={() => toggleModal(false)}>
            <ModalHeader className='justify-content-center'>
                Congratulations
            </ModalHeader>
            <ModalBody className='text-center'>
                <h5>Total Flips / Correct Flips / Wrong Flips</h5>
                <h5>{clicked[0] + clicked[1]} / {clicked[0]} / {clicked[1]}</h5>
            </ModalBody>
        </Modal>
    )
}

export default GameCompleted;