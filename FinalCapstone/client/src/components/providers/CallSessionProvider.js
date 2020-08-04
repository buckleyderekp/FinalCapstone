
import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"
import "firebase/auth";
import { AppointmentSessionContext } from "./AppointmentSessionProvider";

export const CallSessionContext = React.createContext();

export const CallSessionProvider = (props) => {
    const [callSessions, setCallSessions] = useState([]);
    const [contactRatio, setContactRatio] = useState([]);
    const [callLog, setCallLog] = useState([]);
    const { time } = useContext(AppointmentSessionContext)

    const apiUrl = "/api/callsession";
    const { getToken } = useContext(UserProfileContext);


    const getTimeCallSessions = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setCallSessions(res)
                    return res
                }));

    const getContactRatio = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/contactratio/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setContactRatio(res)
                    return res
                }));

    const addCallSession = (callsession) => {

        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(callsession),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })).then((res) => {
                getTimeCallSessions(time)
                return res
            })
    };


    const getSession = (id) => {
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
    };

    const getUserCallSessions = () => {
        getToken().then((token) =>
            fetch(apiUrl + '/getbyuser', {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setCallLog);
                }
                throw new Error("Unauthorized");
            }))
    };

    const deleteCallSessionById = (id) => {
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
            }).then(() => getTimeCallSessions(time))
        );
    };

    const editCallSession = (callsession) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(callsession),
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            }).then(() => getTimeCallSessions(time))
        )
    };


    return (
        <CallSessionContext.Provider value={{ contactRatio, getContactRatio, callSessions, getUserCallSessions, setCallSessions, addCallSession, getTimeCallSessions, editCallSession, deleteCallSessionById, addCallSession, getSession }}>
            {props.children}
        </CallSessionContext.Provider>
    );
};