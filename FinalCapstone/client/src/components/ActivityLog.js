import React, { useContext, useEffect, useState } from "react";
import { Table } from 'reactstrap';
import "./ActivityLog.css"
import { CallSessionContext } from "./providers/CallSessionProvider";
import { CallLog } from "./displays/CallLog";
import { AppointmentSessionContext } from "./providers/AppointmentSessionProvider";
import { AppointmentLog } from "./displays/AppointmentLog";
import { SaleContext } from "./providers/SaleProvider";
import { SaleLog } from "./displays/SalesLog";
import { AddCallSessionForm } from "./forms/AddCallSessionForm";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Form } from 'reactstrap';
import { AddAppointmentSessionForm } from "./forms/AddAppointmentSessionForm";
import { AddSaleForm } from "./forms/AddSaleForm";
import { CallSessionView } from "./displays/CallSessionView";


export const AcitivyLog = () => {

    const { getTimeSales, sales, addSale, logTotal, getLogTotals } = useContext(SaleContext)
    const { getTimeCallSessions, callSessions, addCallSession } = useContext(CallSessionContext)
    const { time, setTime, getTimeAppointmentSessions, appointmentSessions, addAppointmentSession } = useContext(AppointmentSessionContext)
    const [callSessionModal, setCallSessionModal] = useState(false);
    const addCallSessionToggle = () => setCallSessionModal(!callSessionModal);
    const [activeCallSessionModal, setActiveCallSessionModal] = useState(false);
    const startCallSessionToggle = () => setActiveCallSessionModal(!activeCallSessionModal);
    const [appointmentSessionModal, setAppointmentSessionModal] = useState(false);
    const addAppointmentSessionToggle = () => setAppointmentSessionModal(!appointmentSessionModal);
    const [saleModal, setSaleModal] = useState(false);
    const addSaleToggle = () => setSaleModal(!saleModal);
    const [userInput, setUserInput] = useState(null);


    const handleUserInput = (e) => {
        const updatedState = { ...userInput }
        updatedState[e.target.id] = e.target.value
        setUserInput(updatedState);
    };

    const addNewCallSession = () => {
        addCallSession(userInput).then(() => addCallSessionToggle())
    }
    const addNewAppointmentSession = () => {
        addAppointmentSession(userInput).then(() => addAppointmentSessionToggle())
    }
    const addNewSale = () => {
        addSale(userInput).then(() => addSaleToggle())
    }


    useEffect(() => {
        getTimeCallSessions(time)
        getTimeAppointmentSessions(time)
        getTimeSales(time)
        getLogTotals(time)
    }, [time]);


    return (
        <>
            <h3 className="title--activityLog">Activity Log</h3>
            <div className="buttoncontainer">
                {(time === 7) ? <Button color="light" className="timeButton buttonseven" >Past 7 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime(7)}>Past 7 Days</Button>}
                {(time === 30) ? <Button color="light" className="timeButton buttonthirty" >Past 30 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime(30)}>Past 30 Days</Button>}
                {(time === 90) ? <Button color="light" className="timeButton buttonninety" >Past 90 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime(90)}>Past 90 Days</Button>}
                {(time === 365) ? <Button color="light" className="timeButton buttonone" >Past year</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime(365)}>Past year</Button>}
            </div>
            <div className="container">
                <Row lg={{ size: 12 }} className="activityTitle callLog">Call Log</Row>
                <Row lg={{ size: 12 }}><Button onClick={addCallSessionToggle} color="dark">Add Call Session</Button><Button onClick={startCallSessionToggle} color="dark" className="startCallSessionBtn">Start Call Session</Button></Row>
                <Row lg={{ size: 12 }} className="activityContainer callLog">    <Table striped>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Call Goal</th>
                            <th>Calls</th>
                            <th>Contacts</th>
                            <th>Appointments</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {callSessions.slice().reverse().map(tcs => {

                            return <CallLog callSession={tcs} />

                        })}
                    </tbody>
                    <thead>
                        <tr>
                            <td>Totals</td>
                            <td>{logTotal.callGoals}</td>
                            <td>{logTotal.calls}</td>
                            <td>{logTotal.contacts}</td>
                            <td>{logTotal.appointments}</td>
                            <td></td>
                        </tr>
                    </thead>
                </Table></Row>
                <Row lg={{ size: 12 }} className="activityTitle appointmentLog">Appointment Log</Row>
                <Row lg={{ size: 12 }}><Button onClick={addAppointmentSessionToggle} color="dark">Add Appointment Session</Button></Row>
                <Row lg={{ size: 12 }} className="activityContainer appointmentLog">    <Table striped>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Appointments Kept</th>
                            <th>Presentations</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentSessions.map(as => {

                            return <AppointmentLog appointmentSession={as} />

                        })}
                    </tbody>
                    <thead>
                        <tr>
                            <td>Total</td>
                            <td>{logTotal.appointmentsKept}</td>
                            <td>{logTotal.presentations}</td>
                            <td></td>
                        </tr>
                    </thead>
                </Table></Row>
                <Row lg={{ size: 12 }} className="activityTitle salesLog">Sales Log</Row>
                <Row lg={{ size: 12 }}><Button onClick={addSaleToggle} color="dark">Add Sale</Button></Row>
                <Row lg={{ size: 12 }} className="activityContainer salesLog">    <Table striped>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Closing Attempts</th>
                            <th>Commission</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(s => {

                            return <SaleLog sale={s} />

                        })}
                    </tbody>
                    <thead>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>{logTotal.closes}</td>
                            <td>${logTotal.commission}</td>
                            <td></td>
                        </tr>
                    </thead>
                </Table></Row>
            </div>
            <Modal isOpen={callSessionModal} toggle={addCallSessionToggle} >
                <Form>
                    <ModalBody>
                        <ModalHeader toggle={addCallSessionToggle}>Add Call Session</ModalHeader>
                        <AddCallSessionForm handleUserInput={handleUserInput} />
                        <ModalFooter>
                            <Button className="red" onClick={addNewCallSession}>Submit</Button>
                            <Button className="blue" onClick={addCallSessionToggle}>Cancel</Button>
                        </ModalFooter>
                    </ModalBody>
                </Form>
            </Modal>
            <Modal isOpen={appointmentSessionModal} toggle={addAppointmentSessionToggle} >
                <Form>
                    <ModalBody>
                        <ModalHeader toggle={addAppointmentSessionToggle}>Add Appointment Session</ModalHeader>
                        <AddAppointmentSessionForm handleUserInput={handleUserInput} />
                        <ModalFooter>
                            <Button className="red" onClick={addNewAppointmentSession}>Submit</Button>
                            <Button className="blue" onClick={addAppointmentSessionToggle}>Cancel</Button>
                        </ModalFooter>
                    </ModalBody>
                </Form>
            </Modal>
            <Modal isOpen={saleModal} toggle={addSaleToggle} >
                <Form>
                    <ModalBody>
                        <ModalHeader toggle={addSaleToggle}>Add Sale</ModalHeader>
                        <AddSaleForm handleUserInput={handleUserInput} />
                        <ModalFooter>
                            <Button className="red" onClick={addNewSale}>Submit</Button>
                            <Button className="blue" onClick={addSaleToggle}>Cancel</Button>
                        </ModalFooter>
                    </ModalBody>
                </Form>
            </Modal>
            <Modal isOpen={activeCallSessionModal} toggle={startCallSessionToggle} >
                <ModalBody>
                    <ModalHeader startCallSessionToggle={startCallSessionToggle}>Call Session</ModalHeader>
                    <CallSessionView startCallSessionToggle={startCallSessionToggle} />
                </ModalBody>
            </Modal>
        </>

    )

}