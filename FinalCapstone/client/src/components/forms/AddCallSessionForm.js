import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';


export const AddCallSessionForm = ({ handleUserInput }) => {


    return (
        <>
            <div className="form-group">
                <FormGroup>
                    <Label for="callGoal">Call Goal</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="CallGoal" required />
                </FormGroup>
                <FormGroup>
                    <Label for="calls">Calls</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Calls" required />
                </FormGroup>
                <FormGroup>
                    <Label for="contacts">Contacts</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Contacts" required />
                </FormGroup>
                <FormGroup>
                    <Label for="appointmentsBooked">Appointments Booked</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="AppointmentsBooked" required />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                        onChange={handleUserInput}
                        type="date"
                        name="date"
                        id="Date"
                        placeholder="date placeholder"
                        required
                    />
                </FormGroup>
            </div>
        </>
    )
}