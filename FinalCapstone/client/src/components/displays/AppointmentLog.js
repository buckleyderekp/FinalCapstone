import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";

export const AppointmentLog = ({ appointmentSession }) => {

    const { deleteAppointmentSessionById } = useContext(AppointmentSessionContext)
    let momentDate = moment(appointmentSession.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");
    const [appointmentModal, setAppointmentModal] = useState(false);
    const appointmentToggle = () => setAppointmentModal(!appointmentModal);
    const deleteEntry = () => {
        deleteAppointmentSessionById(appointmentSession.id).then(() => appointmentToggle())
    }


    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{appointmentSession.appointmentsKept}</td>
                <td>{appointmentSession.presentations}</td>
                <td><Button className="blue" >Edit</Button> <Button className="red" onClick={appointmentToggle}>Delete</Button></td>
            </tr>

            <Modal isOpen={appointmentModal} toggle={appointmentToggle} >
                <ModalHeader toggle={appointmentToggle}>{formattedDate}</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this entry?
  </ModalBody>
                <ModalFooter>
                    <Button   onClick={deleteEntry}>Delete</Button>
                    <Button className="blue" onClick={appointmentToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>

    )
}