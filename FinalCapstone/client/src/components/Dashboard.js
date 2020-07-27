import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.css"
import { Button } from "reactstrap";
import { Line, Pie } from 'react-chartjs-2';
import { CallSessionContext } from "./providers/CallSessionProvider";

export const Dashboard = () => {

    const [time, setTime] = useState("sevendays")
    const { callSessions, getTimeCallSessions } = useContext(CallSessionContext)
    const [goals, setGoals] = useState([])
    const [dates, setDates] = useState([])
    const [calls, setCalls] = useState([])
    const mockData = [1, 2, 3, 4, 5]

    useEffect(() => {
        getTimeCallSessions(1, 30);
    }, []);

    let lineState = {
        data: {
            labels: ["why", "won't", "this", "work"],
            datasets: [
                {
                    label: 'Number Of Calls',
                    data: mockData
                }
            ]
        }
    }




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
                <div className="gridrow1--1 chartcontainer1">
                    <Line
                        data={lineState.data}
                        options={{
                            maintainAspectRatio: false,
                            title: {
                                display: true,
                                text: 'Calls',
                                fontSize: 20,
                            }
                        }}
                    >
                    </Line></div>
                <div className="gridrow1--2 chartcontainer1"></div>
            </div>
            <div className="gridrow2">
                <div className="gridrow2--1 chartcontainer2"><Pie></Pie></div>
                <div className="gridrow2--2 chartcontainer2"></div>
                <div className="gridrow2--3 chartcontainer2"></div>
                <div className="gridrow2--4 chartcontainer2"></div>
                <div className="gridrow2--5 chartcontainer2"></div>
                <div className="gridrow2--6 chartcontainer2"></div>
            </div>
        </>

    )
}