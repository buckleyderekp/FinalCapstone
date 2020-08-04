import React, { useContext, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { SaleContext } from "../providers/SaleProvider";
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";
import "./SaleSnapshotModalView.css"


export const SaleSnapshotModalView = () => {


    const { snapshot, getSaleSnapshot } = useContext(SaleContext)
    const { time } = useContext(AppointmentSessionContext)


    useEffect(() => {
        getSaleSnapshot(time)
    }, [time]);


    return (
        <Container fluid={true} className="snapshotModal">
            <Row lg={{ size: 12 }} className="snapshotModal--title">Snapshot</Row>
            <Row lg={{ size: 12 }} className="snapshotModal--key">
                <Col lg={{ size: 4 }} className="snapshotModal--columnTitle">Calls</Col>
                <Col lg={{ size: 4 }} className="snapshotModal--columnTitle">Contacts</Col>
                <Col lg={{ size: 4 }} className="snapshotModal--columnTitle">Appointments</Col>
            </Row>
            <Row lg={{ size: 12 }} className="snapshotModal--value">
                <Col lg={{ size: 4 }} className="snapshotModal--columnValue">{snapshot.calls}</Col>
                <Col lg={{ size: 4 }} className="snapshotModal--columnValue">{snapshot.contacts}</Col>
                <Col lg={{ size: 4 }} className="snapshotModal--columnValue">{snapshot.appointments}</Col>
            </Row>
            <Row lg={{ size: 12 }} className="snapshotModal--key">
                <Col lg={{ size: 4 }} className="snapshotModal--columnTitle">Presentations</Col>
                <Col lg={{ size: 4 }} className="snapshotModal--columnTitle">Closes</Col>
                <Col lg={{ size: 4 }} className="snapshotModal--columnTitle">Commission</Col>
            </Row>
            <Row lg={{ size: 12 }} className="snapshotModal--value">
                <Col lg={{ size: 4 }} className="snapshotModal--columnValue">{snapshot.presentations}</Col>
                <Col lg={{ size: 4 }} className="snapshotModal--columnValue">{snapshot.closes}</Col>
                <Col lg={{ size: 4 }} className="snapshotModal--columnValue">${snapshot.commission}</Col>
            </Row>
        </Container>
    )
}