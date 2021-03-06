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
    const [appointmentsBooked, setAppointmentsBooked] = useState(0)
    const date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    let momentDate = moment(Date());
    let formattedDate = momentDate.utc().format("YYYY/DD/MM, h:mm:ss a");

    const GoalTracker = () =>{
        if(calls < callGoal){
            return (
                <div className="callSessionGoal">You're only {callGoal - calls} away from your goal!</div>
            )
        }
        else if(calls ==    callGoal){
            return (
                <div className="callSessionGoalHit">You've reached your goal!</div>
            )
        }
        else if ( calls > callGoal){
            return(
                <div className="callSessionGoalHit">You're {calls - callGoal} calls over your goal!</div>
            )
        }
    }


    useEffect(() => {
        console.log(appointmentsBooked)
        if (appointmentsBooked === 0) {
            return
        }
        editCallSession(callSessionActive).then(() => setCallSessionState("logCall"))

    }, [appointmentsBooked]);


    const callSessionStart = { callGoal, calls, contacts, appointmentsBooked, date }
    const callSessionActive = { id, callGoal, calls, contacts, appointmentsBooked, date }

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
                {GoalTracker()}
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
            
            {GoalTracker()}
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
                {GoalTracker()}
                <Button className="callSessionLeft" onClick={() => {
                    setAppointmentsBooked(appointmentsBooked + 1)

                }}>Booked</Button>
                <Button className="callSessionRight" onClick={() => {
                    editCallSession(callSessionActive)
                    setCallSessionState("logCall")
                }}>Did Not Book</Button>
            </>
        )
    }
}
