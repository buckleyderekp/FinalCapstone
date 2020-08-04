import React, { useState, useContext, useEffect } from "react"
import { Button } from "reactstrap"
import { Label, Input, FormGroup } from 'reactstrap';
import "./CallSessionView.css"
import { CallSessionContext } from "../providers/CallSessionProvider";
import moment from 'moment';

export const CallSessionView = ({ startCallSessionToggle }) => {


    const { addCallSession, editCallSession } = useContext(CallSessionContext)
    const [callSessionState, setCallSessionState] = useState("startSession")
    const [callGoal, setCallGoal] = useState(0)
    const [id, setId] = useState(0)
    const [calls, setCalls] = useState(0)
    const [contacts, setContacts] = useState(0)
    const [appointments, setAppointments] = useState(0)
    const date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    let momentDate = moment(Date());
    let formattedDate = momentDate.utc().format("YYYY/DD/MM, h:mm:ss a");

    const AddAppointmentUpdate = () => {
        setAppointments(appointments + 1)
    }


    const callSessionStart = { callGoal, calls, contacts, appointments, date }
    const callSessionActive = { id, callGoal, calls, contacts, appointments, date }

    if (callSessionState === "startSession") {
        return (
            <>
                <FormGroup>
                    <Label for="callGoal">Call Goal</Label>
                    <Input onChange={e => setCallGoal(e.target.value)} type="text" name="text" id="callGoal" required />
                </FormGroup>
                <Button className="callSessionLeft" onClick={() => {

                    addCallSession(callSessionStart).then((res) => setId(res.id)).then(() => console.log(id)).then(() => setCallSessionState("logCall"))
                }}>Start Session</Button>
                <Button className="callSessionRight" onClick={() => startCallSessionToggle()}>Cancel</Button>

            </>
        )
    }
    else if (callSessionState === "logCall") {
        return (
            <>
                <div className="callSessionGoal">You're only {callGoal - calls} away from your goal!</div>
                <Button className="callSessionLeft" onClick={() => {

                    setCalls(calls + 1)
                    setCallSessionState("answer?")
                }}>Log a Call</Button>
                <Button className="callSessionRight" onClick={() => {

                    startCallSessionToggle()
                }}>End Session</Button>
            </>
        )
    }
    else if (callSessionState === "answer?") {
        return (
            <>
                <div className="callSessionGoal">You're only {callGoal - calls} away from your goal!</div>
                <Button className="callSessionLeft" onClick={() => {
                    setContacts(contacts + 1)
                    setCallSessionState("appointment?")
                }}>Answered</Button>
                <Button className="callSessionRight" onClick={() => {

                    editCallSession(callSessionActive)
                    setCallSessionState("logCall")
                }}>No Answer</Button>
            </>
        )
    }
    else if (callSessionState === "appointment?") {
        return (
            <>
                <div className="callSessionGoal">You're only {callGoal - calls} away from your goal!</div>
                <Button className="callSessionLeft" onClick={() => {
                    AddAppointmentUpdate().then(() => editCallSession(callSessionActive)).then(() => setCallSessionState("logCall"))

                }}>Booked</Button>
                <Button className="callSessionRight" onClick={() => {
                    editCallSession(callSessionActive)
                    setCallSessionState("logCall")
                }}>Did Not Book</Button>
            </>
        )
    }
}
