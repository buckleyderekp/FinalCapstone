import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';

export const EditCallSessionForm = ({ handleUserInput, callSession }) => {

    let momentDate = moment(callSession.date);
    let formattedDate = momentDate.utc().format("MM/DD/YYYY");

    return (
        <>

            <div className="form-group">

                <FormGroup>
                    <Label for="callGoal">Call Goal</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="CallGoal" defaultValue={callSession.callGoal} required />
                </FormGroup>
                <FormGroup>
                    <Label for="calls">Calls</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Calls" defaultValue={callSession.calls} required />
                </FormGroup>
                <FormGroup>
                    <Label for="contacts">Contacts</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Contacts" required defaultValue={callSession.contacts} />
                </FormGroup>
                <FormGroup>
                    <Label for="appointmentsBooked">Appointments Booked</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="AppointmentsBooked" defaultValue={callSession.appointmentsBooked} required />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                        onChange={handleUserInput}
                        type="date"
                        name="date"
                        id="Date"
                        defaultValue={formattedDate}
                        required
                    />
                </FormGroup>
            </div>
        </>
    )
}