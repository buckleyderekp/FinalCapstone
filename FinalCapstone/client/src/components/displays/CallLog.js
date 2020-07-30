import React from "react";
import { Table } from 'reactstrap';
import { Button } from "reactstrap";
import moment from 'moment';

export const CallLog = ({ callSession }) => {


    let momentDate = moment(callSession.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");

    return (
        <>
            <tr>

                <td>{formattedDate}</td>
                <td>{callSession.callGoal}</td>
                <td>{callSession.calls}</td>
                <td>{callSession.contacts}</td>
                <td>{callSession.appointmentsBooked}</td>
                <td><Button className ="blue" >Edit</Button> <Button className="red">Delete</Button></td>
            </tr>
        </>

    )
}