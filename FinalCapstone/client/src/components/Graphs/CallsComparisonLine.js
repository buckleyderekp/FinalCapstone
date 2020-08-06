import React, { useContext, useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";
import { CallSessionContext } from "../providers/CallSessionProvider";

export const CallsComparisonLine = () => {

    const { time } = useContext(AppointmentSessionContext)
    const { callSessions, getTimeCallSessions } = useContext(CallSessionContext)
    const [goals, setGoals] = useState([])
    const [dates, setDates] = useState([])
    const [calls, setCalls] = useState([])


    useEffect(() => {
            getTimeCallSessions(time)
    }, [time])


    useEffect(() => {
        const copy = callSessions.slice()
        let callsArray = []
        let callGoalArray = []
        let dateArray = []

        copy.map(c => {
            callsArray.push(c.calls)
            callGoalArray.push(c.callGoal)
            const unformatedDate = c.date.split("T")[0]
            const [year, month, day] = unformatedDate.split("-");
            const formatedDate = month + "/" + day;
            dateArray.push(formatedDate);
        })
        setCalls(callsArray)
        setDates(dateArray)
        setGoals(callGoalArray)
    }, [callSessions])


    let lineState = {
        data: {
            labels: dates,
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.6)",
                    strokeColor: "rgba(220,220,220,1)",
                    label: 'Number Of Calls',
                    data: calls,
                    fill: false,
                    lineTension: .3,
                    backgroundColor: "#296098",
                    borderColor: "#3F7FBF"

                },
                {
                    label: 'Call Goal',
                    data: goals,
                    fill: false,
                    lineTension: .3,
                    backgroundColor: "#982936",
                    borderColor: "#982936"

                }
            ]
        }
    }

    return (
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
        </Line>
    )
}