import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';

export const EditCallSessionForm = ({ handleUserEdit, callSession }) => {

    let momentDate = moment(callSession.date);
    let formattedDate = momentDate.utc().format("YYYY/DD/MM");

    return (
        <>
            <div className="form-group">
                <FormGroup>
                    <Label for="callGoal">Call Goal</Label>
                    <Input onChange={handleUserEdit} type="number" name="text" id="callGoal" defaultValue={callSession.callGoal} required />
                </FormGroup>
                <FormGroup>
                    <Label for="calls">Calls</Label>
                    <Input onChange={handleUserEdit} type="text" name="text" id="calls" defaultValue={callSession.calls} required />
                </FormGroup>
                <FormGroup>
                    <Label for="contacts">Contacts</Label>
                    <Input onChange={handleUserEdit} type="text" name="text" id="contacts" required defaultValue={callSession.contacts} />
                </FormGroup>
                <FormGroup>
                    <Label for="appointmentsBooked">Appointments Booked</Label>
                    <Input onChange={handleUserEdit} type="text" name="text" id="appointmentsBooked" defaultValue={callSession.appointmentsBooked} required />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                        onChange={handleUserEdit}
                        type="date"
                        name="date"
                        id="date"
                        placeholder={formattedDate}
                        required
                    />
                </FormGroup>
            </div>
        </>
    )
}