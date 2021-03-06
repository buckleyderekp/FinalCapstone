import React, { useContext, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { CallSessionContext } from "../providers/CallSessionProvider";
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";

 export const ContactsPie = () => {

    const { contactRatio, getContactRatio} = useContext(CallSessionContext)
    const {time } = useContext(AppointmentSessionContext)
    
    
    useEffect(() => {
        getContactRatio(time)
    }, [time]);
    
    
    const data = {
        percentagebooked: Math.round((contactRatio.appointmentsBooked)/ contactRatio.contacts * 100),
        percentageNotBooked: Math.round(((contactRatio.contacts - contactRatio.appointmentsBooked)/ contactRatio.contacts * 100)),
    }

    const contactData = Object.values(data)

    let contactAppointmentState = {
        data: {
            labels: ["% booked", "% did not book"],
            datasets: [
                {
                    label: "Contacts",
                    data: contactData,
                    backgroundColor: ['#BD6F08', "#982936"]
                }
            ]
        }
    }

    return (
        <Pie
            data={contactAppointmentState.data}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Contacts',
                    fontSize: 19,
                }
            }}>
        </Pie>
    )
}