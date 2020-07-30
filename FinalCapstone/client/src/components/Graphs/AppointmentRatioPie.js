import React, { useEffect, useContext } from 'react';
import { AppointmentSessionContext } from '../providers/AppointmentSessionProvider';
import { Pie } from 'react-chartjs-2';

export const AppointmentRatioPie = () => {

    const { appointmentRatio, getAppointmentRatio, time } = useContext(AppointmentSessionContext)

    useEffect(() => {
        getAppointmentRatio(1, 7)
    }, []);

    useEffect(() => {
        if (time === "sevendays") {
            getAppointmentRatio(1, 7)
        }
        else if (time === "thirtydays") {
            getAppointmentRatio(1, 30)
        }
        else if (time === "ninetydays") {
            getAppointmentRatio(1, 90)
        }
        else if (time === "oneyear") {
            getAppointmentRatio(1, 365)
        }
    }, [time])

    const data = {
        percentageKept: Math.round((appointmentRatio.appointmentsKept)/ appointmentRatio.appointmentsBooked * 100),
        percentageNotKept: Math.round(((appointmentRatio.appointmentsBooked - appointmentRatio.appointmentsKept)/ appointmentRatio.appointmentsBooked * 100)),
    }

    const appointmentKeptData = Object.values(data)

    let appointmentKeptState = {
        data: {
            labels: ["% cancelled", "% kept"],
            datasets: [
                {
                    label: "Appointments",
                    data: appointmentKeptData,
                    backgroundColor: ["#58287A", '#296098' ]
                }
            ]
        }
    }

    return (
        <Pie
            data={appointmentKeptState.data}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Appointments',
                    fontSize: 19,
                }
            }}>
        </Pie>
    )

}