import React, { useEffect, useContext } from 'react';
import { AppointmentSessionContext } from '../providers/AppointmentSessionProvider';
import { Pie } from 'react-chartjs-2';

export const AppointmentRatioPie = () => {

    const { appointmentRatio, getAppointmentRatio, time } = useContext(AppointmentSessionContext)
  
    


    
    useEffect(() => {
        getAppointmentRatio(time)
    }, [time]);



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