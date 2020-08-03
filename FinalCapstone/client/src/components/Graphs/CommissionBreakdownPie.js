import React, { useContext, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { SaleContext } from "../providers/SaleProvider";
import { AppointmentSessionContext } from "../providers/AppointmentSessionProvider";

export const CommissionBreakdownPie = () => {

    const { commissionByProduct, getCommissionByProduct } = useContext(SaleContext)
    const { time } = useContext(AppointmentSessionContext)

  

    useEffect(() => {
        getCommissionByProduct(time)
    }, [time]);



    let objectThing = {}
    let commissionTotal = 0
    commissionByProduct.map(cbp => {
        commissionTotal += cbp.numberOfSales
        const pname = cbp.product.productName
        objectThing[pname] = cbp.numberOfSales
    }
    )


    const productValuesData = Object.values(objectThing)
    const productPercentages = productValuesData.map(pvd => {
        if (pvd === 0) {
            return 0
        }
        else {

            const theMath = (pvd / commissionTotal) * 100
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
                    label: " By Product",
                    data: productPercentages,
                    backgroundColor: ["#598829", '#296098', "#BD6F08", "#982936", "#58287A"]
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
                    text: "Commission By Product",
                    fontSize: 19,
                }
            }}>
        </Pie>
    )
}