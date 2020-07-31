import React, { useState, useContext } from "react";
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CallSessionContext } from "../providers/CallSessionProvider";

export const CallLog = ({ callSession }) => {

    const { deleteCallSessionById } = useContext(CallSessionContext)
    let momentDate = moment(callSession.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const deleteEntry = () => {
        deleteCallSessionById(callSession.id).then(toggle)
    }

    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{callSession.callGoal}</td>
                <td>{callSession.calls}</td>
                <td>{callSession.contacts}</td>
                <td>{callSession.appointmentsBooked}</td>
                <td><Button className="blue" >Edit</Button> <Button className="red" onClick={toggle}>Delete</Button></td>
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
            </div>
        </>

    )
}