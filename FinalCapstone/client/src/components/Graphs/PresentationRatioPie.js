import React, { useContext, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";



export const PresentationPie = () => {

    const { time, getPresentationRatio, presentationRatio } = useContext(AppointmentSessionContext)




    useEffect(() => {
        getPresentationRatio(time)
    }, [time]);


    const data = {
        percentagePresented: Math.round((presentationRatio.presentations) / presentationRatio.appointmentsKept * 100),
        percentageNotPresented: Math.round(((presentationRatio.appointmentsKept - presentationRatio.presentations) / presentationRatio.appointmentsKept * 100)),
    }

    const presentationData = Object.values(data)

    let presentationState = {
        data: {
            labels: ["% Presented to", "% Not presented to"],
            datasets: [
                {
                    label: "Presentations",
                    data: presentationData,
                    backgroundColor: ["#598829", "#982936"]
                }
            ]
        }
    }

    return (
        <Pie
            data={presentationState.data}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Presentations',
                    fontSize: 19,
                }
            }}>
        </Pie>
    )
}