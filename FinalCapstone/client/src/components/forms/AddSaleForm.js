import React from "react";
import { FormGroup, Label, Input, Col } from 'reactstrap';


export const AddSaleForm = ({ handleUserInput }) => {


    return (
        <>

            <div className="form-group">

                <FormGroup>
                    <Label for="exampleSelect">Select</Label>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="commission">Commission</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Comission" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="closes">Number of Closing Attempts</Label>
                    <Input onChange={handleUserInput} type="text" name="text" id="Closes" required/>
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