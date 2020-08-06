import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';


export const EditAppointmentSessionForm = ({ handleUserEdit, appointmentSession }) => {


    return (
        <>
            <div className="form-group">
                <FormGroup>
                    <Label for="appointmentsKept">Appointments Kept</Label>
                    <Input onChange={handleUserEdit} type="text" name="text" id="appointmentsKept" required defaultValue={appointmentSession.appointmentsKept} />
                </FormGroup>
                <FormGroup>
                    <Label for="presentations">Presentations</Label>
                    <Input onChange={handleUserEdit} type="text" name="text" id="presentations" required defaultValue={appointmentSession.presentations} />
                </FormGroup>
                <FormGroup>
                    <Label for="Date">Date</Label>
                    <Input
                        onChange={handleUserEdit}
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