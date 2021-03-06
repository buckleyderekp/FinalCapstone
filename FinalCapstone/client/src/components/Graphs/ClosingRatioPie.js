import React, { useContext, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { SaleContext } from "../providers/SaleProvider";
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";


export const ClosingRatioPie = () => {

    const { getClosingRatio, closingRatio } = useContext(SaleContext)
    const { time } = useContext(AppointmentSessionContext)
 

    useEffect(() => {
        getClosingRatio(time)
    }, [time]);


    const data = {
        percentageClosed: Math.round((closingRatio.sales) / closingRatio.presentations * 100),
        percentageNotClosed: Math.round(((closingRatio.presentations - closingRatio.sales) / closingRatio.presentations * 100)),
    }

    const closingData = Object.values(data)

    let closingState = {
        data: {
            labels: ["% Closed", "% Not closed"],
            datasets: [
                {
                    label: "Closing",
                    data: closingData,
                    backgroundColor: ["#598829", '#58287A']
                }
            ]
        }
    }

    return (
        <Pie
            data={closingState.data}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Closing',
                    fontSize: 19,
                }
            }}>
        </Pie>
    )
}