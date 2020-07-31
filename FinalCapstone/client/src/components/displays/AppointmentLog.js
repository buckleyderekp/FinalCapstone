import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

export const AppointmentLog = ({ appointmentSession }) => {


    let momentDate = moment(appointmentSession.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");

    const [appointmentModal, setAppointmentModal] = useState(false);

    const appointmentToggle = () => setAppointmentModal(!appointmentModal);

    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{appointmentSession.appointmentsKept}</td>
                <td>{appointmentSession.presentations}</td>
                <td><Button className="blue" >Edit</Button> <Button className="red">Delete</Button></td>
            </tr>

            <Modal isOpen={appointmentModal} toggle={appointmentToggle} >
                <ModalHeader toggle={appointmentToggle}>{formattedDate}</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this entry?
  </ModalBody>
                <ModalFooter>
                    <Button className="red" onClick={appointmentToggle}>Delete</Button>
                    <Button className="blue" onClick={appointmentToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>

    )
}