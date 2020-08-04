import React, { useContext, useState } from "react";
import "./Dashboard.css"
import { Button, Modal, ModalBody } from "reactstrap";
import { AppointmentSessionContext } from "./providers/AppointmentSessionProvider";
import { AppointmentRatioPie } from "./Graphs/AppointmentRatioPie";
import { ContactsPie } from "./Graphs/ContactsPie";
import { CallsComparisonLine } from "./Graphs/CallsComparisonLine";
import { PresentationPie } from "./Graphs/PresentationRatioPie";
import { ClosingRatioPie } from "./Graphs/ClosingRatioPie";
import { ProductBreakdownPie } from "./Graphs/ProductBreakdownPie";
import { CommissionBreakdownPie } from "./Graphs/CommissionBreakdownPie";
import { SaleSnapshot } from "./displays/SaleSnapshot";
import { SaleSnapshotModalView } from "./displays/SaleSnapshotModalView";

export const Dashboard = () => {

    const { time, setTime } = useContext(AppointmentSessionContext)

    const [callComparisonModal, setCallComparisonModal] = useState(false);
    const callComparisonToggle = () => setCallComparisonModal(!callComparisonModal);
    const [saleSnapshotModal, setSaleSnapshotModal] = useState(false);
    const saleSnapshotToggle = () => setSaleSnapshotModal(!saleSnapshotModal);
    const [contactsModal, setContactsModal] = useState(false);
    const contactsToggle = () => setContactsModal(!contactsModal);
    const [appointmentsModal, setAppointmentsModal] = useState(false);
    const appointmentsToggle = () => setAppointmentsModal(!appointmentsModal);
    const [presentationsModal, setPresentationsModal] = useState(false);
    const presentationsToggle = () => setPresentationsModal(!presentationsModal);
    const [closingModal, setClosingModal] = useState(false);
    const closingToggle = () => setClosingModal(!closingModal);
    const [sbpModal, setSbpModal] = useState(false);
    const sbpToggle = () => setSbpModal(!sbpModal);
    const [sbcModal, setSbcModal] = useState(false);
    const sbcToggle = () => setSbcModal(!sbcModal);

    return (
        <>
            <h3 className="title--dashboard">Dashboard</h3>
            <div className="buttoncontainer">
                {(time === 7) ? <Button color="light" className="timeButton buttonseven" >Past 7 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime(7)}>Past 7 Days</Button>}
                {(time === 30) ? <Button color="light" className="timeButton buttonthirty" >Past 30 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime(30)}>Past 30 Days</Button>}
                {(time === 90) ? <Button color="light" className="timeButton buttonninety" >Past 90 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime(90)}>Past 90 Days</Button>}
                {(time === 365) ? <Button color="light" className="timeButton buttonone" >Past year</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime(365)}>Past year</Button>}
            </div>
            <div className="gridrow1">
                <div className="gridrow1--1 chartcontainer1" onClick={() => callComparisonToggle()}><CallsComparisonLine /></div>
                <div className="gridrow1--2 chartcontainer1" onClick={() => saleSnapshotToggle()}><SaleSnapshot /></div>
            </div>
            <div className="gridrow2">
                <div className="gridrow2--1 chartcontainer2" onClick={() => contactsToggle()}><ContactsPie /></div>
                <div className="gridrow2--2 chartcontainer2" onClick={() => appointmentsToggle()}><AppointmentRatioPie /></div>
                <div className="gridrow2--3 chartcontainer2" onClick={() => presentationsToggle()}><PresentationPie /></div>
                <div className="gridrow2--4 chartcontainer2" onClick={() => closingToggle()}><ClosingRatioPie /></div>
                <div className="gridrow2--5 chartcontainer2" onClick={() => sbpToggle()}><ProductBreakdownPie /></div>
                <div className="gridrow2--6 chartcontainer2" onClick={() => sbcToggle()}><CommissionBreakdownPie /></div>
            </div>
            <Modal size="xl" isOpen={callComparisonModal} toggle={callComparisonToggle} >
                <ModalBody >
                    <div className="chartContainer">
                        <CallsComparisonLine callComparisonToggle={callComparisonToggle} />
                    </div>
                </ModalBody>
            </Modal>
            <Modal size="xl" isOpen={saleSnapshotModal} toggle={saleSnapshotToggle} >
                <ModalBody >
                    <div className="chartContainer">
                        <SaleSnapshotModalView saleSnapshotToggle={saleSnapshotToggle} />
                    </div>
                </ModalBody>
            </Modal>
            <Modal size="xl" isOpen={contactsModal} toggle={contactsToggle} >
                <ModalBody >
                    <div className="chartContainer">
                        <ContactsPie contactsToggle={contactsToggle} />
                    </div>
                </ModalBody>
            </Modal>
            <Modal size="xl" isOpen={appointmentsModal} toggle={appointmentsToggle} >
                <ModalBody >
                    <div className="chartContainer">
                        <AppointmentRatioPie appointmentsToggle={appointmentsToggle} />
                    </div>
                </ModalBody>
            </Modal>
            <Modal size="xl" isOpen={presentationsModal} toggle={presentationsToggle} >
                <ModalBody >
                    <div className="chartContainer">
                        <PresentationPie presentationsToggle={presentationsToggle} />
                    </div>
                </ModalBody>
            </Modal>
            <Modal size="xl" isOpen={closingModal} toggle={closingToggle} >
                <ModalBody >
                    <div className="chartContainer">
                        <ClosingRatioPie closingToggle={closingToggle} />
                    </div>
                </ModalBody>
            </Modal>
            <Modal size="xl" isOpen={sbpModal} toggle={sbpToggle} >
                <ModalBody >
                    <div className="chartContainer">
                        <ProductBreakdownPie sbpToggle={sbpToggle} />
                    </div>
                </ModalBody>
            </Modal>
            <Modal size="xl" isOpen={sbcModal} toggle={sbcToggle} >
                <ModalBody >
                    <div className="chartContainer">
                        <CommissionBreakdownPie sbcToggle={sbcToggle} />
                    </div>
                </ModalBody>
            </Modal>
        </>

    )
}