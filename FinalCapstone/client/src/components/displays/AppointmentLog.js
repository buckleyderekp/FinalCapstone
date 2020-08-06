import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";
import { EditAppointmentSessionForm } from "../forms/EditAppointmentSessionForm";

export const AppointmentLog = ({ appointmentSession }) => {

    const { deleteAppointmentSessionById, editAppointmentSession } = useContext(AppointmentSessionContext)
    let momentDate = moment(appointmentSession.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");
    const [appointmentModal, setAppointmentModal] = useState(false);
    const appointmentToggle = () => setAppointmentModal(!appointmentModal);
    const [editModal, setEditModal] = useState(false);
    const editToggle = () => setEditModal(!editModal);
    const deleteEntry = () => {
        deleteAppointmentSessionById(appointmentSession.id).then(() => appointmentToggle())
    }

    const [userEdit, setUserEdit] = useState(null);
    const handleUserEdit = (e) => {
        const updatedState = { ...userEdit }
        updatedState[e.target.id] = e.target.value
        setUserEdit(updatedState);
    };

    const editSubmit = () => {
        if (userEdit != appointmentSession) {
            editAppointmentSession(userEdit).then(editToggle)
        }
        else {
            editToggle()
        }
    }


    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{appointmentSession.appointmentsKept}</td>
                <td>{appointmentSession.presentations}</td>
                <td><Button className="blue" onClick={() => {
                    editToggle()
                    setUserEdit(appointmentSession)
                }}>Edit</Button> 
                <Button className="red" onClick={appointmentToggle}>Delete</Button></td>
            </tr>

            <Modal isOpen={appointmentModal} toggle={appointmentToggle} >
                <ModalHeader toggle={appointmentToggle}>{formattedDate}</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this entry?
                </ModalBody>
                <ModalFooter>
                    <Button onClick={deleteEntry}>Delete</Button>
                    <Button className="blue" onClick={appointmentToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={editModal} editToggle={editToggle} >
                <ModalHeader editToggle={editToggle}>{formattedDate}</ModalHeader>
                <ModalBody>
                    <EditAppointmentSessionForm appointmentSession={appointmentSession} handleUserEdit={handleUserEdit} />
                </ModalBody>
                <ModalFooter>
                    <Button className="red" onClick={editSubmit}>Submit</Button>
                    <Button className="blue" onClick={editToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>

    )
}