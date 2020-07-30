import React from "react";
import { Table } from 'reactstrap';
import { Button } from "reactstrap";
import moment from 'moment';

export const AppointmentLog = ({ appointmentSession }) => {


    let momentDate = moment(appointmentSession.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");

    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{appointmentSession.appointmentsKept}</td>
                <td>{appointmentSession.presentations}</td>
                <td><Button className="blue" >Edit</Button> <Button className="red">Delete</Button></td>
            </tr>
        </>

    )
}