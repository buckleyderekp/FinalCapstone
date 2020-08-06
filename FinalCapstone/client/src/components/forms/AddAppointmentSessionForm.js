import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';


export const AddAppointmentSessionForm = ({ handleUserInput }) => {


    return (
        <>
            <div className="form-group">
                <FormGroup>
                    <Label for="appointmentsKept">Appointments Kept</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="appointmentsKept" required />
                </FormGroup>
                <FormGroup>
                    <Label for="presentations">Presentations</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="presentations" required />
                </FormGroup>
                <FormGroup>
                    <Label for="Date">Date</Label>
                    <Input
                        onChange={handleUserInput}
                        type="date"
                        name="date"
                        id="date"
                        placeholder="date placeholder"
                        required
                    />
                </FormGroup>
            </div>
        </>
    )
}