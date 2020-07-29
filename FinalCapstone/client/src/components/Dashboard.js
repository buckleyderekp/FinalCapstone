import React, { useContext } from "react";
import "./Dashboard.css"
import { Button } from "reactstrap";
import { AppointmentSessionContext } from "./providers/AppointmentSessionProvider";
import { AppointmentRatioPie } from "./Graphs/AppointmentRatioPie";
import { ContactsPie } from "./Graphs/ContactsPie";
import { CallsComparisonLine } from "./Graphs/CallsComparisonLine";
import { PresentationPie } from "./Graphs/PresentationRatioPie";
import { ClosingRatioPie } from "./Graphs/ClosingRatioPie";

export const Dashboard = () => {
    const { time, setTime } = useContext(AppointmentSessionContext)

    return (
        <>
            <h3 className="title--dashboard">Dashboard</h3>
            <div className="buttoncontainer">
                {(time === "sevendays") ? <Button color="light" className="timeButton buttonseven" >Past 7 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime("sevendays")}>Past 7 Days</Button>}
                {(time === "thirtydays") ? <Button color="light" className="timeButton buttonthirty" >Past 30 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime("thirtydays")}>Past 30 Days</Button>}
                {(time === "ninetydays") ? <Button color="light" className="timeButton buttonninety" >Past 90 Days</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime("ninetydays")}>Past 90 Days</Button>}
                {(time === "oneyear") ? <Button color="light" className="timeButton buttonone" >Past year</Button> : <Button color="dark" className="timeButton buttonSeven" onClick={() => setTime("oneyear")}>Past year</Button>}
            </div>
            <div className="gridrow1">
                <div className="gridrow1--1 chartcontainer1"><CallsComparisonLine /></div>
                <div className="gridrow1--2 chartcontainer1"></div>
            </div>
            <div className="gridrow2">
                <div className="gridrow2--1 chartcontainer2"><ContactsPie /></div>
                <div className="gridrow2--2 chartcontainer2"><AppointmentRatioPie /></div>
                <div className="gridrow2--3 chartcontainer2"><PresentationPie /></div>
                <div className="gridrow2--4 chartcontainer2"><ClosingRatioPie/></div>
                <div className="gridrow2--5 chartcontainer2"></div>
                <div className="gridrow2--6 chartcontainer2"></div>
            </div>
        </>

    )
}