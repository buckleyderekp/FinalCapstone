import React, { useContext, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { SaleContext } from "../providers/SaleProvider";
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";
import "./SaleSnapshot.css"


export const SaleSnapshot = () => {



    const { snapshot, getSaleSnapshot } = useContext(SaleContext)
    const { time } = useContext(AppointmentSessionContext)


    useEffect(() => {
        getSaleSnapshot(1, 7)
    }, []);

    useEffect(() => {
        if (time === "sevendays") {
            getSaleSnapshot(1, 7)
        }
        else if (time === "thirtydays") {
            getSaleSnapshot(1, 30)
        }
        else if (time === "ninetydays") {
            getSaleSnapshot(1, 90)
        }
        else if (time === "oneyear") {
            getSaleSnapshot(1, 365)
        }
    }, [time])

    return (
        <Container fluid={true} className="snapshot">
            <Row lg={{ size: 12 }} className="snapshot--title">Snapshot</Row>
            <Row lg={{ size: 12 }} className="snapshot--key">
                <Col lg={{ size: 4 }} className="snapshot--columnTitle">Calls</Col>
                <Col lg={{ size: 4 }} className="snapshot--columnTitle">Contacts</Col>
                <Col lg={{ size: 4 }} className="snapshot--columnTitle">Appointments</Col>

            </Row>
            <Row lg={{ size: 12 }} className="snapshot--value">
                <Col lg={{ size: 4 }} className="snapshot--columnValue">{snapshot.calls}</Col>
                <Col lg={{ size: 4 }} className="snapshot--columnValue">{snapshot.contacts}</Col>
                <Col lg={{ size: 4 }} className="snapshot--columnValue">{snapshot.appointments}</Col>

            </Row>
            <Row lg={{ size: 12 }} className="snapshot--key">
                <Col lg={{ size: 4 }} className="snapshot--columnTitle">Presentations</Col>
                <Col lg={{ size: 4 }} className="snapshot--columnTitle">Closes</Col>
                <Col lg={{ size: 4 }} className="snapshot--columnTitle">Commission</Col>

            </Row>
            <Row lg={{ size: 12 }} className="snapshot--value">
                <Col lg={{ size: 4 }} className="snapshot--columnValue">{snapshot.presentations}</Col>
                <Col lg={{ size: 4 }} className="snapshot--columnValue">{snapshot.closes}</Col>
                <Col lg={{ size: 4 }} className="snapshot--columnValue">${snapshot.commission}</Col>

            </Row>



        </Container>

    )


}