import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"
import "firebase/auth";

export const AppointmentSessionContext = React.createContext();

export const AppointmentSessionProvider = (props) => {
    const [appointmentSessions, setAppointmentSessions] = useState([]);
    const [appointmentRatio, setAppointmentRatio] = useState([]);
    const [presentationRatio, setPresentationRatio] = useState([]);
    const [time, setTime] = useState(7);

    const apiUrl = "/api/appointmentsession";
    const { getToken } = useContext(UserProfileContext);


    const getTimeAppointmentSessions = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setAppointmentSessions(res)
                    return res
                }));

    const getAppointmentRatio = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/appointmentratio/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setAppointmentRatio(res)
                    return res
                }));

    const getPresentationRatio = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/presentationratio/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setPresentationRatio(res)
                    return res
                }));



    const addAppointmentSession = (appsession) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appsession),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })).then(() => getTimeAppointmentSessions(time));


    const getAppointmentSession = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                else { throw new Error("Unauthorized"); }
            }));
    }

    const getUserAppointmentSessions = () => {
        getToken().then((token) =>
            fetch(apiUrl + `/getbyuser`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setAppointmentSessions);
                }
                throw new Error("Unauthorized");
            }))
    };

    const deleteAppointmentSessionById = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete session.")
            }).then(() => getTimeAppointmentSessions(time))
        );
    };

    const editAppointmentSession = (appsession) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appsession),
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            }).then(() => getTimeAppointmentSessions(time))
        )
    };


    return (
        <AppointmentSessionContext.Provider value={{
            time,
            setTime,
            getAppointmentRatio,
            appointmentRatio,
            setAppointmentRatio,
            appointmentSessions,
            getUserAppointmentSessions,
            setAppointmentSessions,
            addAppointmentSession,
            getTimeAppointmentSessions,
            editAppointmentSession,
            deleteAppointmentSessionById,
            addAppointmentSession,
            getAppointmentSession,
            getPresentationRatio,
            presentationRatio,
            setPresentationRatio
        }}>
            {props.children}
        </AppointmentSessionContext.Provider>
    );
};