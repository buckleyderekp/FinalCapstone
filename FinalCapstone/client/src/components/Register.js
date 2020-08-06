import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";
import "./Register.css";

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [organizationCode, setOrganizationCode] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { name, email, organizationCode };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <Form className="registerForm" onSubmit={registerClick}>
            <fieldset>
                <FormGroup className="registerInput">
                    <Label htmlFor="name">Name</Label>
                    <Input className="registerInput" id="name" type="text" onChange={e => setName(e.target.value)} />
                </FormGroup>
                <FormGroup className="registerInput">
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className="registerInput">
                    <Label for="email">Organization Code</Label>
                    <Input id="email" type="text" onChange={e => setOrganizationCode(e.target.value)} />
                </FormGroup>
                <FormGroup className="registerInput">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup className="registerInput">
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <FormGroup className="registerInput">
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}