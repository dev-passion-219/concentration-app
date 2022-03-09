import React, { useEffect, useState } from 'react';
import { FormGroup, Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ColumnInput = (props) => {
    const { isOpen, onStartGame } = props;

    const [row, setRow] = useState(2);
    const [column, setColumn] = useState(2);

    const handleClose = (result) => {
        onStartGame(result, row, column);
    }

    return (
        <Modal isOpen={isOpen} toggle={() => handleClose(false)}>
            <ModalHeader>
                New Game
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>
                        Row
                    </Label>
                    <Input
                        type='number'
                        value={row}
                        onChange={(event) => setRow(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Column
                    </Label>
                    <Input
                        type='number'
                        value={column}
                        onChange={(event) => setColumn(event.target.value)}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    className='mr-2'
                    onClick={() => handleClose(true)}
                >
                    Create
                </Button>
                <Button
                    onClick={() => handleClose(false)}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ColumnInput;