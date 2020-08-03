import React, { useContext, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { SaleContext } from "../providers/SaleProvider";
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";

export const ProductBreakdownPie = () => {

    const { salesByProduct, getSalesByProduct } = useContext(SaleContext)
    const { time } = useContext(AppointmentSessionContext)




    useEffect(() => {
        getSalesByProduct(time)
    }, [time]);


    let objectThing = {}
    let salesTotal = 0
    salesByProduct.map(spb => {
        salesTotal += spb.numberOfSales
        const pname = spb.product.productName
        objectThing[pname] = spb.numberOfSales
    }
    )


    const productValuesData = Object.values(objectThing)
    const productPercentages = productValuesData.map(pvd => {
        if (pvd === 0) {
            return 0
        }
        else {

            const theMath = (pvd / salesTotal) * 100
            return parseFloat(theMath.toFixed(2))
        }
    }
    )
    const productKeysData = Object.keys(objectThing)

    let contactAppointmentState = {
        data: {
            labels: productKeysData,
            datasets: [
                {
                    label: "Sales By Product",
                    data: productPercentages,
                    backgroundColor: ['#296098', "#982936", "#58287A", "#598829", "#BD6F08"]
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
                    text: "Sales By Product",
                    fontSize: 19,
                }
            }}>
        </Pie>
    )
}
