import React, { useContext, useEffect } from "react";
import { Table } from 'reactstrap';
import { Button, Container, Row, Col } from "reactstrap";
import "./ActivityLog.css"
import { CallSessionContext } from "./providers/CallSessionProvider";
import { CallLog } from "./displays/CallLog";
import { AppointmentSessionContext } from "./providers/AppointmentSessionProvider";
import { AppointmentLog } from "./displays/AppointmentLog";


export const AcitivyLog = () => {

    const { getTimeCallSessions, callSessions } = useContext(CallSessionContext)
    const { time, setTime, getTimeAppointmentSessions, appointmentSessions } = useContext(AppointmentSessionContext)

    useEffect(() => {
        getTimeCallSessions(1, 7)
        getTimeAppointmentSessions(1, 7)
    }, []);
    useEffect(() => {
        if (time === "sevendays") {
            getTimeCallSessions(1, 7)
            getTimeAppointmentSessions(1, 7)

        }
        else if (time === "thirtydays") {
            getTimeCallSessions(1, 30)
            getTimeAppointmentSessions(1, 30)

        }
        else if (time === "ninetydays") {
            getTimeCallSessions(1, 90)
            getTimeAppointmentSessions(1, 90)

        }
        else if (time === "oneyear") {
            getTimeCallSessions(1, 365)
            getTimeAppointmentSessions(1, 365)

        }
    }, [time])

    return (
        <>
            <h3 className="title--activityLog">Activity Log</h3>
            <div className="buttoncontainer">
                {(time === "sevendays") ? <Button color="light" className="timeButton buttonseven" >Past 7 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime("sevendays")}>Past 7 Days</Button>}
                {(time === "thirtydays") ? <Button color="light" className="timeButton buttonthirty" >Past 30 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime("thirtydays")}>Past 30 Days</Button>}
                {(time === "ninetydays") ? <Button color="light" className="timeButton buttonninety" >Past 90 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime("ninetydays")}>Past 90 Days</Button>}
                {(time === "oneyear") ? <Button color="light" className="timeButton buttonone" >Past year</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime("oneyear")}>Past year</Button>}
            </div>
            <div className="container">
                <div className="activityTitle callLog">Call Log</div>
                <Row lg={{ size: 12 }} className="activityContainer callLog">    <Table striped>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Call Goal</th>
                            <th>Calls</th>
                            <th>Contacts</th>
                            <th>Appointments</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {callSessions.slice().reverse().map(tcs => {

                            return <CallLog callSession={tcs} />

                        })}
                    </tbody>
                </Table></Row>
                <Row lg={{ size: 12 }} className="activityTitle appointmentLog">Appointment Log</Row>
                <Row lg={{ size: 12 }} className="activityContainer appointmentLog">    <Table striped>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Appointments Kept</th>
                            <th>Presentations</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentSessions.slice().reverse().map(as => {

                            return <AppointmentLog appointmentSession={as} />

                        })}
                    </tbody>
                </Table></Row>
                <Row lg={{ size: 12 }} className="activityTitle salesLog">Sales Log</Row>
                <Row lg={{ size: 12 }} className="activityContainer salesLog">    <Table striped>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Call Goal</th>
                            <th>Calls</th>
                            <th>Contacts</th>
                            <th>Appointments</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {callSessions.slice().reverse().map(tcs => {

                            return <CallLog callSession={tcs} />

                        })}
                    </tbody>
                </Table></Row>
            </div>
        </>

    )

}