import React, { useState, useContext } from "react";
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CallSessionContext } from "../providers/CallSessionProvider";
import { EditCallSessionForm } from "../forms/EditCallSessionForm";

export const CallLog = ({ callSession }) => {

    const { deleteCallSessionById } = useContext(CallSessionContext)
    let momentDate = moment(callSession.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [editModal, setEditModal] = useState(false);
    const editToggle = () => setEditModal(!editModal);

    const deleteEntry = () => {
        deleteCallSessionById(callSession.id).then(toggle)
    }

    const [userInput, setUserInput] = useState(null);
    const handleUserInput = (e) => {

        const updatedState = { ...userInput }
        updatedState[e.target.id] = e.target.value
        setUserInput(updatedState);
    };

    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{callSession.callGoal}</td>
                <td>{callSession.calls}</td>
                <td>{callSession.contacts}</td>
                <td>{callSession.appointmentsBooked}</td>
                <td><Button className="blue" onClick={editToggle}>Edit</Button> <Button className="red" onClick={toggle}>Delete</Button></td>
            </tr>

            <div>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>{formattedDate}</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this entry?
  </ModalBody>
                    <ModalFooter>
                        <Button className="red" onClick={deleteEntry}>Delete</Button>
                        <Button className="blue" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={editModal} editToggle={editToggle} >
                    <ModalHeader editToggle={editToggle}>{formattedDate}</ModalHeader>
                    <ModalBody>
                        <EditCallSessionForm callSession={callSession} handleUserInput={handleUserInput} />
                    </ModalBody>
                    <ModalFooter>
                        <Button className="red" >Submit</Button>
                        <Button className="blue" onClick={editToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>

    )
}