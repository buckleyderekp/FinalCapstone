import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"
import "firebase/auth";

export const AppointmentSessionContext = React.createContext();

export const AppointmentSessionProvider = (props) => {
    const [appointmentSessions, setAppointmentSessions] = useState([]);
    const [appointmentRatio, setAppointmentRatio] = useState([]);
    const [presentationRatio, setPresentationRatio] = useState([]);
    const [time, setTime] = useState("sevendays");

    const apiUrl = "/api/appointmentsession";
    const { getToken } = useContext(UserProfileContext);


    const getTimeAppointmentSessions = (id, days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setAppointmentSessions(res)
                    return res
                }));

    const getAppointmentRatio = (id, days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}/appointmentratio/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setAppointmentRatio(res)
                    return res
                }));

    const getPresentationRatio = (id, days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}/presentationratio/?days=${days}`, {
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
            }));




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

    const getUserAppointmentSessions = (id) => {
        getToken().then((token) =>
            fetch(apiUrl + `/getbyuser/${id}`, {
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
            })
        );
    };

    const editAppointmentSession = (id, appsession) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
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
            }))
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