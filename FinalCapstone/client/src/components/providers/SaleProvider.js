
import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"
import "firebase/auth";

export const SaleContext = React.createContext();

export const SaleProvider = (props) => {
    const [sales, setSales] = useState([]);
    const [closingRatio, setClosingRatio] = useState([]);
    const [salesByProduct, setSalesByProduct] = useState([]);
    const [commissionByProduct, setCommissionByProduct] = useState([]);

    const apiUrl = "/api/sale";
    const { getToken } = useContext(UserProfileContext);


    const getTimeSales = (id, days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setSales(res)
                    return res
                }));

    const getClosingRatio = (id, days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}/closingratio/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setClosingRatio(res)
                    return res
                }));

    const getSalesByProduct = (id, days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}/salesbyproduct/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setSalesByProduct(res)
                    return res
                }));

    const getCommissionByProduct = (id, days) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}/commissionbyproduct/?days=${days}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((res) => {
                    setCommissionByProduct(res)
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
            }));


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
    }


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
            })
        );
    };

    const editSale = (id, sale) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
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
            }))
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
            getCommissionByProduct
        }}>
            {props.children}
        </SaleContext.Provider>
    );
};