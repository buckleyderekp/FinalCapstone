
import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"
import "firebase/auth";
import { AppointmentSessionContext } from "./AppointmentSessionProvider";

export const SaleContext = React.createContext();

export const SaleProvider = (props) => {
    const [sales, setSales] = useState([]);
    const [closingRatio, setClosingRatio] = useState([]);
    const [salesByProduct, setSalesByProduct] = useState([]);
    const [commissionByProduct, setCommissionByProduct] = useState([]);
    const [snapshot, setSnapshot] = useState([]);
    const [logTotal, setLogTotal] = useState([]);
    const { time } = useContext(AppointmentSessionContext)

    const apiUrl = "/api/sale";
    const { getToken } = useContext(UserProfileContext);


    const getTimeSales = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setSales(res)
                    return res
                }));

    const getLogTotals = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/alllogtotals/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setLogTotal(res)
                    return res
                }));

    const getClosingRatio = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/closingratio/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setClosingRatio(res)
                    return res
                }));

    const getSalesByProduct = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/salesbyproduct/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setSalesByProduct(res)
                    return res
                }));

    const getCommissionByProduct = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/commissionbyproduct/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setCommissionByProduct(res)
                    return res
                }));

    const getSaleSnapshot = (days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/salesnapshot/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setSnapshot(res)
                    return res
                }));



    const addSale = (sale) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sale),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }).then(() => getTimeSales(time)));


    const getSale = (id) => {
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


    const deleteSaleById = (id) => {
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
            })).then(() => getTimeSales(time))
    };

    const editSale = (sale) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sale),
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            })).then(() => getTimeSales(time));
    };

    return (
        <SaleContext.Provider value={{
            closingRatio,
            setClosingRatio,
            sales,
            setSales,
            getTimeSales,
            addSale,
            editSale,
            deleteSaleById,
            getSale,
            getClosingRatio,
            getSalesByProduct,
            salesByProduct,
            setSalesByProduct,
            commissionByProduct,
            setCommissionByProduct,
            getCommissionByProduct,
            getSaleSnapshot,
            snapshot,
            setSnapshot,
            getLogTotals,
            logTotal,
            setLogTotal
        }}>
            {props.children}
        </SaleContext.Provider>
    );
};