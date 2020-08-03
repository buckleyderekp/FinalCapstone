import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';


export const AddAppointmentSessionForm = ({ handleUserInput }) => {


    return (
        <>

            <div className="form-group">

                <FormGroup>
                    <Label for="callGoal">Appointments Kept</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="CallGoal" required />
                </FormGroup>
                <FormGroup>
                    <Label for="callGoal">Presentations</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Calls" required />
                </FormGroup>
                <FormGroup>
                    <Label for="Date">Date</Label>
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